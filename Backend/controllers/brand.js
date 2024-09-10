import { brandRepository } from '../repositories/index.js'

async function findAll(req, res) {
    try {
        const brands = await brandRepository.findAll(req, res);
        res.status(200).json({
            message: 'Get all brands successfully.',
            data: brands
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

async function findOne(req, res, next) {

    try {

        const brand = await brandRepository.findOne(req, res, next);

        if (brand.length !== 0) {
            return res.status(200).json({
                message: 'find one brand successfully',
                data: brand
            })
        }
        return res.status(404).json({
            message: 'brand not found'
        });
    } catch (error) {

        res.status(500).json({
            message: error.toString()
        })
    }

}
async function createOne(req, res, next) {

    try {

        const brand = await brandRepository.createOne(req, res, next);
        if (brand) {
            return res.status(201).json({
                message: 'Create brand successfully',
                data: brand
            })
        }
        return res.status(400).json({
            message: 'Can not create brand'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })

    }

}
async function deleteOne(req, res, next) {

    try {

        const brand = await brandRepository.deleteOne(req, res, next);
        if (brand.deletedCount > 0) {
            return res.status(200).json({
                message: 'Delete brand successfully',
                data: brand
            })
        }
        return res.status(400).json({
            message: 'brand not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function updateOne(req, res, next) {

    try {

        const brand = await brandRepository.updateOne(req, res, next);
        if (brand.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Update brand successfully',
                data: brand
            })
        }
        return res.status(400).json({
            message: 'brand not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}




export default {
    findAll,
    findOne,
    createOne, deleteOne, updateOne
}