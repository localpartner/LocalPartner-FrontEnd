import React, { useState, useEffect } from "react";
import { getTopCategories, getCategories, list, searchingData } from "./apiCore";
import Card from "./Card";
import { Link } from "react-router-dom";
import FilterSearchData from "./FilterSearchData"
import { useHistory } from "react-router-dom";
import { useRecoilState,useRecoilValue } from "recoil";
import { topCategoriesState } from "../recoil/atom/topCategories";


const navigateToShopPage = (history,category,name)=>{
    
    if(category && name){
        history.push(`/shop/1/${category}/2/${name}`);
    }else if (category && !name){
        history.push(`/shop/1/${category}`);
    }else if (!category && name){
        history.push(`/shop/2/${name}`);
    }else{
        history.push("/shop")
    }
    
}

const Search = () => {
   
    const topCategories = useRecoilValue(topCategoriesState)
    const [data, setData] = useState({
        categories: [],
        category: "",
        name: "",
        results: [],
        searched: false
    });
    const [query,setQuery]=useState("");
    const { categories, category, name, results, searched } = data;
    //const categories =[], category=[], search =[], results=[], searched = [];

    /* const loadCategories = () => {
         getCategories().then(data => {
             // if (data.error) {
             //     console.log(data.error);
             // } else {
             //     setData({ ...data, categories: data });
             // }
         });
     };
     useEffect(() => {
         loadCategories();
     }, []); */
    const [categories_list, setCategories_list] = useState(["All"])
    //const [categories_list_top, setCategories_list_top] = useState([])

    //  useEffect(async () => {
    //     let response = await getCategories()
    //     setCategories_list(response)
    //     /* let response_ = await getTopCategories()
    //     console.log(response_)
    //     console.log(5555555)
    //     setCategories_list_top(response_) */

    // }, []);

    useEffect( () => {
        //const response = await getTopCategories();
        
        let array1 = ["All"]
       
        let array2 = array1.concat(topCategories)
        setCategories_list(array2)
    }, [topCategories]);


    const searchData = () => {
        // console.log(search, category);
        
        navigateToShopPage(category,name)
        /*if (name) {
             searchingData(category, name).then(
                response => {
                    if (response && response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }*/
    };

    const searchSubmit = e => {
        e.preventDefault();
        ///searchData();
        navigateToShopPage(history,category,name)
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
        
    };

    const searchMessage = (searched, results) => {
        
        if (searched  && results.result.length > 0) {
        
            // FilterSearchData()
            return (
                <>
                < FilterSearchData data={data.results}/>             
                 
                </>
            )
          
        }
        if (searched != '' && results.result.length < 1) {
            return `No products found`;
        }
    };
    
    const searchedProducts = (results = []) => {
        console.log("Tarang-1", searched, "Prateek", results && results.result && results.result)
        return (
            <div>
                
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                {results.result != undefined ? (
                    <>
                        <div className="row">
                            {results.result.map((product, i) => (
                                <div className="col-4 mb-3">
                                    <Card key={i} product={product.name} />
                                </div>
                            ))}
                        </div>
                    </>) : (null
                    )}

            </div>
        );
    }; 

    console.log("results", results.result)

    const searchForm = (history) => (
        <form onSubmit={searchSubmit}>
            <div className="search_filter">
                <select
                    className="select_dropdown"
                    onChange={handleChange("category")}
                >
                    <option value="">All Categories</option>
                    {
                        categories_list.map(function (item, i) {
                            return <option value={item.code}>{item.name}</option>
                        })
                    }



                    {/* categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    )) */}
                </select>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    placeholder="Search Product" />
                <button className="search_btn">
                    <i className="fas fa-search"></i>
                </button>
                
            </div>
            {
                categories_list.map(function (item, i) {
                    let url = "/shop/1/"+ item.code
                    let name = item.name
                   if (item == "All"){
                    url = "/shop"
                    name = "All"
                   }
                    return (
                        <div style={{ display: 'inline-block',marginTop:"15px" }}>
                            <Link to= {url} style={{ textAlign: 'center', color: 'white',padding:"15px" }}>
                               {name}
                            </Link>
                        </div>

                    )
                })
            }
        </form>


    );
    const history = useHistory();
    return (
        <div className="row">
            <div className="container mb-3">{searchForm(history)}</div>
            {searchedProducts(results)}
          
            
        </div>
    );
};




export default Search;