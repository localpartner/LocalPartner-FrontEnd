import React, { useState, useEffect } from 'react';
import { getFeaturedProducts,getSpecialProducts } from './apiCore';
import Card from './Card';
import FeaturedProducts from './FeaturedProducts';
import SpecialProducts from './SpecialProducts';
import Search from './Search';
import {SliderMainWrapper} from "./SliderMainWrapper"
import Layout from './Layout';


const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [specialProducts, setSpecialProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadSpecialProducts = async () => {
        try{
            let resp = await getSpecialProducts()
            return resp.data.result;
            
        }catch(error){
            setError("Error while fetching products");
            return []
        }
        
    };

    const loadFeaturedProducts = async () => {
        try{
            let resp = await getFeaturedProducts()
            return resp.data.result;
            
        }catch(error){
            setError("Error while fetching products");
            return []
        }
        
    };

    useEffect(  () => {
        const fetchData = async()=>{
            let newProducts = await loadFeaturedProducts();
            console.log("new Products : ",newProducts)
            setFeaturedProducts(newProducts);
            let topProducts = await loadSpecialProducts();
            setSpecialProducts(topProducts)
        }
        fetchData();
       
    }, []);
    
    return (
       
        <>
            <Layout className="container-fluid">
                 <div className="row">
                </div>  
                {featuredProducts && featuredProducts.length >0 ?
                <FeaturedProducts products={featuredProducts}/>   :
                null 
                 }
                {specialProducts && specialProducts.length >0 ?
                <SpecialProducts products={specialProducts}/>   :
                null       
                 }
            </Layout>
            
        </>
    );
};



export default Home;
