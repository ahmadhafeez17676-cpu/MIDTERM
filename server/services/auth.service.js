const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { supabase } = require("../db/supabase");

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
const JWT_EXPIRES_IN = "7d";

/**
 * Register a new user
 */
const register = async ({ name, email, password, role }) => {
  // Check if user exists
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    throw { status: 409, message: "User with this email already exists." };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Insert user
  const { data: user, error } = await supabase
    .from("users")
    .insert({ name, email, password: hashedPassword, role })
    .select("id, name, email, role, created_at")
    .single();

  if (error) throw { status: 500, message: "Failed to create user.", detail: error.message };

  // Generate token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { user, token };
};

/**
 * Login user
 */
const login = async ({ email, password }) => {
  // Find user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    throw { status: 401, message: "Invalid email or password." };
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Invalid email or password." };
  }

  // Generate token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // Don't return password
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

module.exports = { register, login };
