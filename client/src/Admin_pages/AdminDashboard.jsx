import { addFeatureImage, getFeatureImages } from '@/store/common';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from './imageUpload';
import { Button } from '@/components/ui/button';

function AdminDashboard() {
  const [imagefile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState("");
  const [imageUploadingState ,setImageUploadingState] = useState(false)

  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.common);



  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(imageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className='p-5'>
    <ImageUpload
       currentEditedId={currentEditedId}
       imagefile={imagefile}
       setImageFile={setImageFile}
       imageUrl={imageUrl}
       setImageUrl={setImageUrl}
       imageUploadingState={imageUploadingState}
       setImageUploadingState ={setImageUploadingState}
      // isEditMode={currentEditedId !== null}
    />
    <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
      Upload
    </Button>
    <div className="flex flex-col gap-4 mt-5">
      {featureImageList && featureImageList.length > 0
        ? featureImageList.map((featureImgItem) => (
            <div className="relative">
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
          ))
        : null}
    </div>
  </div>
  )
}

export default AdminDashboard
