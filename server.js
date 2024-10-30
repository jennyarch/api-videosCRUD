import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres()

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos;
});

//Request Body
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        // SINTAXE DE NOME SHORTS(POIS O NOME DO BODY É EXATAMENTE IGUAL)
        title,
        description,
        duration,

        // SINTAXE COMUM
        // title: title,
        // description: description,
        // duration: duration,
    });

    return reply.status(201).send()
});

//Route Parameter -> parametro da rota
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body


    await database.update(videoId, {
        title,
        description,
        duration,
    });

    return reply.status(204).send()
});

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
});

server.listen({
    port: 3333,
});
