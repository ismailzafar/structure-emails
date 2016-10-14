import Ajv from 'ajv'
const ajv = new Ajv({
  allErrors: false,
  format: 'full'
})

const schema = {
  "properties": {
    "from": {
      "format": "email",
      "type": "string"
    },
    "html": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "text": {
      "type": "string"
    },
    "to": {
      "format": "email",
      "type": "string"
    }
  },
  "required": ["from", "subject", "text", "to"]
}

const validate = ajv.compile(schema)

export default function schemaSend(req, res, next) {

  const pkg = req.body

  const valid = validate(pkg)

  if(!valid) return next(validate.errors)

  next()

}
