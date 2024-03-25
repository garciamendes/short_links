// Third party
import postgres from "postgres"

// Project
import { env } from '../envs'

export const sql = postgres(env.DB_POSTGRESS)