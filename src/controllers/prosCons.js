import { asyncHandler } from '../utils/asyncHandler.js';
import { ProsCons } from '../models/prosCons.js';
// Create a new ProsCons entry
// export const createProsCons = async (req, res) => {
//     try {
//         const prosCons = new ProsCons(req.body);
//         await prosCons.save();
//         res.status(201).json(prosCons);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// Get all ProsCons entries
export const getProsCons = asyncHandler(async (req, res,next) => {
    
        const {id} = req.params;
        const prosCons = await ProsCons.findOne({perfumeId:id});

        res.status(200).json({status:true,message:"Fetched Pros Cons Successfully",data:prosCons});
    
        
    
});

// Get a single ProsCons entry by ID
export const getProsConsById = asyncHandler(async (req, res,next) => {
       
        const prosCons = await ProsCons.findById(req.params.id);
        if (!prosCons) {
            return res.status(404).json({ message: 'ProsCons entry not found' });
        }
        res.status(200).json(prosCons);
    
        res.status(500).json({ message: error.message });
    
});

// Update a ProsCons entry by ID
export const updateProsCons = async (req, res) => {
    try {
        const prosCons = await ProsCons.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prosCons) {
            return res.status(404).json({ message: 'ProsCons entry not found' });
        }
        res.status(200).json(prosCons);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a ProsCons entry by ID
export const deleteProsCons = async (req, res) => {
    try {
        const prosCons = await ProsCons.findByIdAndDelete(req.params.id);
        if (!prosCons) {
            return res.status(404).json({ message: 'ProsCons entry not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
