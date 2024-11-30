import Features from "../../model/Features.js";

export const addFeatureImage = async (req, res) => {
    try {
      const { image } = req.body;
  
     
  
      const featureImages = new Features({
        image,
      });
  
      await featureImages.save();
  
      res.status(201).json({
        success: true,
        data: featureImages,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };

  export const getFeatureImages = async (req, res) => {
    try {
      const images = await Features.find({});
  
      res.status(200).json({
        success: true,
        data: images,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };