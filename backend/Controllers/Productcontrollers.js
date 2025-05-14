import Product from "../models/product.js";
import mongoose from "mongoose";


export const getproduct = async(req,res)=>{
      try{
            const products = await Product.find({})
            res.status(200).json({success:true,data:products})
      }
      catch(err){
            console.log("error...");
            res.status(500).json({success:false,message:"server Error"})
            
      }
}


export const createproduct = async(req,res)=>{
     const product = req.body
     if(!product.name || !product.price || !product.image){
      return res.status(400).json({success:false,messagesss: 'please provide all fields'})
     }
     const newproduct = new Product(product)
     try{
      await newproduct.save()
      res.status(201).json({success:true, data:newproduct})
     }
     catch(err){
      console.error("Error in create product",err)
      res.status(500).json({success:false,message:"server Error"})
     }
}


export const updateproduct = async(req,res)=>{
      const {id} = req.params
      const product = req.body
      if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false,message:"invalid id"})
      }
      try{
            const updateproduct = await Product.findByIdAndUpdate(id,product,{new:true})
            res.status(200).json({success:true,data:updateproduct})
      }
      catch(err){
            res.status(500).json({success:false,message:"Server Error"})
      }
}



export const deleteproduct = async(req,res)=>{
      const {id}= req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false,message:"invalid id"})
      }
      try{
            await Product.findByIdAndDelete(id)
            res.status(200).json({success:true,message:"deleted"})
      }
      catch(err){
            res.status(500).json({success: false,message: "product not found"})
            
      }
      
}