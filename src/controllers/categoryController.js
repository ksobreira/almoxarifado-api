import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const getAllCategories = async(req, res) => {
    const categories = await prisma.category.findMany()
    res.json(categories)
}

export const getCategoryById = async(req, res) => {
    const {id} = req.params
    const category = await prisma.category.findUnique({
        where: {id: Number(id)}
    })

    if(!category){
        return res.status(404).json({error: 'Categoria não encontrada'})
    }

    res.json(category)
}

export const createCategory = async(req, res) => {
    const {name, description} = req.body
    const category = await prisma.category.create({
        data: {name, description}
    })
    
    res.status(201).json(category)
}

export const updateCategory = async(req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    
    const category = await prisma.category.findUnique({
        where: {id: Number(id)}
    })

    if(!category){
        return res.status(404).json({error: 'Categoria não encontrada'})
    }

    const updated = await prisma.category.update({
        where: {id: Number(id)},
        data: {name, description}
    })

    res.json(updated)
}

export const deleteCategory = async(req,res) => {
    const {id} = req.params

    const category = await prisma.category.findUnique({
        where: {id: Number(id)}
    })

    if(!category){
        return res.status(404).json({error: 'Categoria não encontrada'})
    }

    await prisma.category.delete({where: {id: Number(id)}})
    res.json({message: 'Categoria deletada com sucesso'})
}
