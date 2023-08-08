import crypto from 'crypto'
import fs from 'fs'

const readFile = fs.promises.readFile

/**
 * Builds an inline schema for the data proxy client. This is useful because it
 * is designed to run in browser-like environments where `fs` is not available.
 * @param schemaPath
 * @returns
 */
export async function buildInlineSchema(schemaPath: string) {
  const b64Schema = (await readFile(schemaPath)).toString('base64')
  const schemaHash = crypto.createHash('sha256').update(b64Schema).digest('hex')

  return `
config.inlineSchema = '${b64Schema}'
config.inlineSchemaHash = '${schemaHash}'`

  return ``
}
