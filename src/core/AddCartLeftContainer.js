
import React,{useState} from 'react' 

//  const [productDetails, setProductDetails] = useState([]);
//  console.log("hello",productDetails)


   

const AddCartLeftContainer=(props)=> {
  return (
     <div className="col-md-2" style={{border:"0px solid #f0f0f0"}}>

        <div className="row">
        <div className='col-12'>
          <label style={{fontSize:"13px"}} for="Sold By"> Sold By :</label>
          <strong><label style={{fontSize:"13px", marginLeft:"10px"}} >{props.product.storeName}</label></strong>
        </div>
       
        
      
      
        
        {/* {/ <div><h3 className=""><span style={{alignItems:"left","color":"black"}}><b>Manufacturer Name</b></span> : {productDetails.links.brand}</h3></div> /} */}

       
            <div className=" justify-content-between mt-3">
                
                
                <button className ="btn btn-dark" style={{borderRadius:"40px", minWidth:"10em",marginTop:"250px",marginLeft:"35px"}}>Add To Cart</button>
                <br></br><br></br>
                <button className="btn btn-primary" style={{borderRadius:"40px", minWidth:"10em",marginLeft:"35px"}} >Add To wishlist</button>
            </div>
            
          </div>
        </div> 
        
  )
}

export default AddCartLeftContainer
