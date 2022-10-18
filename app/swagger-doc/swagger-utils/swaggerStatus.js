const error400 = {
    description: `Bad Request`,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: { Error: { type: 'string' } },
                example: { 'Error 400': 'Bad request' }
            }
        }
    }
}

const error404 = {
    description: 'Data not found',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: { Error: { type: 'string' } },
                example: { 'Error 404': 'Data not found' }
            }
        }
    }
}


module.exports = { error400, error404 };