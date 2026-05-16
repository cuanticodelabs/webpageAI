import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  host: "aws-0-us-west-2.pooler.supabase.com",
  port: 6543,
  user: "postgres.gsrpomnvfcdjbfqffmmb",
  password: "forestalsantablanca2026",
  database: "postgres",
  ssl: { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 10000,
})

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        COUNT(DISTINCT salesid)                                        AS oc_proc,
        ROUND(COUNT(DISTINCT salesid) * 0.01875, 3)                   AS co2_kg,
        COUNT(DISTINCT salesid)                                        AS hojas,
        ROUND(COUNT(DISTINCT salesid) * 0.01875 * 1000 / 57.5, 1)    AS dias_arbol
      FROM salestable_respaldo_liviano
      WHERE DATE(createddatetime) >= '2026-04-14'
    `)

    const r = rows[0]
    return NextResponse.json({
      co2_kg:     parseFloat(r.co2_kg),
      hojas:      parseInt(r.hojas, 10),
      dias_arbol: parseFloat(r.dias_arbol),
    })
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }
}
