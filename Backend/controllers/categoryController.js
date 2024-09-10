import { categoryRepository } from '../repositories/index.js'

async function findAll(req, res) {
    try {
        const categorys = await categoryRepository.findAll(req, res);
        res.status(200).json({
            message: 'Get all categorys successfully.',
            data: categorys
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

async function findOne(req, res, next) {

    try {

        const category = await categoryRepository.findOne(req, res, next);

        if (category.length !== 0) {
            return res.status(200).json({
                message: 'find one category successfully',
                data: category
            })
        }
        return res.status(404).json({
            message: 'category not found'
        });
    } catch (error) {

        res.status(500).json({
            message: error.toString()
        })
    }

}
async function createOne(req, res, next) {

    try {

        const category = await categoryRepository.createOne(req, res, next);
        if (category) {
            return res.status(201).json({
                message: 'Create category successfully',
                data: category
            })
        }
        return res.status(400).json({
            message: 'Can not create category'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })

    }

}
async function deleteOne(req, res, next) {

    try {

        const category = await categoryRepository.deleteOne(req, res, next);
        if (category.deletedCount > 0) {
            return res.status(200).json({
                message: 'Delete category successfully',
                data: category
            })
        }
        return res.status(400).json({
            message: 'category not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function updateOne(req, res, next) {

    try {

        const category = await categoryRepository.updateOne(req, res, next);
        if (category.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Update category successfully',
                data: category
            })
        }
        return res.status(400).json({
            message: 'category not found',
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