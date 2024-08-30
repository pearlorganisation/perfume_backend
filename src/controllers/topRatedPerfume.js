import perfume from '../models/perfume.js';
import { TopRatedPerfume } from '../models/topRatedPerfume.js'; // Adjust the import path as necessary
import { asyncHandler } from '../utils/asyncHandler.js';
import errorResponse from '../utils/errorResponse.js';

// Create a new top-rated perfume
export const createTopRatedPerfume = asyncHandler(async (req, res,next) => {

    console.log(req.body);

    if(req.body.topRatedPerfume && Array.isArray(JSON.parse(req.body.topRatedPerfume)))
        {
            try {
                const topRatedPerfumeData = JSON.parse(req.body.topRatedPerfume) || [];
                
                const data = await TopRatedPerfume.insertMany(topRatedPerfumeData);
                
                console.log(data, "Data inserted successfully");
                res.status(201).json({ status: true, message: "Top Rated Perfumes Created Successfully", data });
            
              } catch (error) {
                if (error.code === 11000) {
                  console.error('Duplicate key error:', error.message);
                  return next(new errorResponse('Duplicate Documents Found!!', 300)); // Adjust status code if needed
                }
                
                // Handle other errors
                console.error('Error inserting documents:', error);
                return next(new errorResponse('An error occurred while inserting documents', 500)); // Internal server error
              }
                    
           
        }   
        else 
        {
            const { gallery, banner, logo } = req?.files;
      
            const {
              purchaseLinks,
              mainAccords,
              middleNote,
              topNote,
              baseNote,
              pros,
              cons,
            } = req?.body;
          
            const newPerfume = new perfume({
              ...req?.body,
              banner: banner[0]?.path,
              gallery,
              pros: JSON.parse(pros),
              cons: JSON.parse(cons),
              logo: logo[0].path,
              purchaseLinks: JSON.parse(purchaseLinks),
              mainAccords: JSON.parse(mainAccords),
              middleNote: JSON.parse(middleNote),
              topNote: JSON.parse(topNote),
              baseNote: JSON.parse(baseNote),
            });
            await newPerfume.save();
    
            const data = await TopRatedPerfume.create({perfumeId:newPerfume._id,perfumeName:newPerfume.perfume});
    
            console.log(data,"we came here in else block");
    
        }
    

        res.status(201).json({status:true,message:"Top Rated Perfume Created Successfully"});
});

// Retrieve all top-rated perfumes
export const getAllTopRatedPerfumes = asyncHandler(async (req, res) => {
  
    const topRatedPerfumes = await TopRatedPerfume.find().lean();
    res.status(200).json(topRatedPerfumes);
  
});

// Retrieve a single top-rated perfume by ID
export const getTopRatedPerfumeById = asyncHandler(async (req, res) => {
  
    const { id } = req.params;
    const topRatedPerfume = await TopRatedPerfume.findById(id).lean();

    if (!topRatedPerfume) {
       res.status(404).json({ message: 'TopRatedPerfume not found' });
    }

    res.status(200).json(topRatedPerfume);
  
});

// Update a top-rated perfume by ID --pending
export const updateTopRatedPerfume = asyncHandler(async (req, res) => {
  
    const { id } = req.params;
    const updates = req.body;

    // Find and update the top-rated perfume
    const updatedTopRatedPerfume = await TopRatedPerfume.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedTopRatedPerfume) {
       res.status(404).json({ message: 'TopRatedPerfume not found' });
    }

    res.status(200).json(updatedTopRatedPerfume);
  
    
});

// Delete a top-rated perfume by ID
export const deleteTopRatedPerfume = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const deletedTopRatedPerfume = await TopRatedPerfume.findByIdAndDelete(id);

    if (!deletedTopRatedPerfume) {
       res.status(404).json({ message: 'TopRatedPerfume not found' });
    }

    res.status(200).json({ message: 'TopRatedPerfume deleted successfully' });
  
});
