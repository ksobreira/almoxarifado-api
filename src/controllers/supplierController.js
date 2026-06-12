import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllSuppliers = async(req,res) => {
    const suppliers = await prisma.supplier.findMany()
    res.json(suppliers)
}

export const getSupplierById = async(req,res) => {
    const {id} = req.params
    const supplier = await prisma.supplier.findUnique({
        where: {id: Number(id)}
    })

    if(!supplier){
        return res.status(404).json({error: 'Fornecedor não encontrado'})
    }

    res.json(supplier)
}

export const createSupplier = async(req,res) => {
    const {name, cnpj, email, phone} = req.body
    const supplier = await prisma.supplier.create({
        data: {name, cnpj, email, phone}
    })

    res.status(201).json(supplier)
}

export const updateSupplier = async(req,res) => {
    const {id} = req.params
    const {name, cnpj, email, phone} = req.body
    
    const supplier = await prisma.supplier.findUnique({
        where: {id: Number(id)}
    })

    if(!supplier){
        return res.status(404).json({error: 'Fornecedor não encontrado'})
    }

    const updated = await prisma.supplier.update({
        where: {id: Number(id)},
        data: {name, cnpj, email, phone}
    })

    res.json(updated)
}

export const deleteSupplier = async(req,res) => {
    const {id} = req.params

    const supplier = await prisma.supplier.findUnique({
        where: {id: Number(id)}
    })

    if(!supplier){
        return res.status(404).json({error: 'Fornecedor não encontrado'})
    }

    await prisma.supplier.delete({where: {id: Number(id)}})
    res.json({message: 'Fornecedor deletado com sucesso'})
}