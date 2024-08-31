/* Importando dependencias */
import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

/*Atribuindo valores*/
const server = express()
const prisma = new PrismaClient()
server.use(express.json())
const hostname = '192.168.10.14'
const port = 3000
server.use(cors())

/* Requisições */
server.post('/usuarios', async (req,res) => {
    await prisma.usuarios.create({
        data:{
            name:req.body.name,
            email:req.body.email
        }
    })
    res.status(201).json(req.body)
}) 

server.put('/usuarios/:id', async (req,res) => {
    await prisma.usuarios.update({
        where: {
            id:parseInt(req.params.id)
        },
            data:{
                name:req.body.name,
                email:req.body.email
            }
        })
        res.status(201).json(req.body)
}) 

server.get('/usuarios', async(req,res) => {

    let users = []

    if(req.query){
        users = await prisma.usuarios.findMany({
            where:{
                name:req.query.name,
                email:req.query.email
            }
        })
    }else{
        users = await prisma.usuarios.findMany()
    }

    res.status(200).json(users)
    
})

server.delete('/usuarios/:id', async(req,res)=>{
    await prisma.usuarios.delete({
        where: {
           id:parseInt(req.params.id) 
        }
    })
    res.status(200).json({message:'Usuário deletado com sucesso!'})
})

/* Iniciando servidor */

server.listen(port , hostname, ()=>{
    console.log(`Server rodando em: http://${hostname}:${port}`)
})