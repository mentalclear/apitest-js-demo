const usersJsonSchema = {
  type: 'array',
  minItems: 1,
  maxItems: 1,
  items: [
    {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        gender: {
          type: 'string',
        },
        status: {
          type: 'string',
        },
      },
      required: ['id', 'name', 'email', 'gender', 'status'],
    },
  ],
};

export default usersJsonSchema;
