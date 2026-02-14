"use client"
import axiosInstance from "@/axiosInstance/axiosInstance";
import Product from "@/components/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {

  const [fetchError, setFetchError] = useState(false);
  const [searchMode, setSearchMode] = useState(false)
  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([]);
  const [CategorizedProducts, setCategorizedProducts] = useState([]);

  const search = useSelector((state) => state.search.value)

  useEffect(() => {
    console.log(search)
  }, [search])


  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/products');
      console.log(res.data.products)
      setProducts(await res.data.products)
      if (res.data.products) {
        const Products = res.data.products
        const beauty = Products.filter((prod) => prod.category === "beauty");
        const fragrances = Products.filter((prod) => prod.category === "fragrances");
        const furniture = Products.filter((prod) => prod.category === "furniture");
        const groceries = Products.filter((prod) => prod.category === "groceries");
        console.log(groceries)
        setCategorizedProducts([
          { title: "Beauty", prod: beauty },
          { title: "Fragrances", prod: fragrances },
          { title: "Furniture", prod: furniture },
          { title: "Groceries", prod: groceries }
        ])
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Product Slider
  // const [groceryNum, setGroceryNum] = useState(4);
  // const len= CategorizedProducts[3]?.prod?.length - 1 ;
  
  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //     setGroceryNum((prev) => {
  //       if (prev >= len) {
  //         return 4;
  //       }
  //       return prev + 1;
  //     });
  //   }, 5000);
  
  //   return () => clearInterval(interval);
  // }, [len])

  const searchProduct = () => {
    if (search !== "") {
      setSearchMode(true)
      const filtered = products.filter((prod) =>
        prod.title.toLowerCase().includes(search.toLowerCase())
      )
      setSearchProducts(filtered);
      if (filtered.length === 0) {
        setFetchError(true)
      } else {
        setFetchError(false)
      }
    } else {
      setSearchMode(false)
      setFetchError(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    searchProduct()
  }, [search]);

  return (
    <div className="mx-0 sm:mx-10 overflow-hidden my-2">
      {/* <Product name="Sample Product" price="29.99" /> */}
      {fetchError &&
        <div className="font-semibold text-white text-center flex items-center justify-center mt-30">
          No product with &quot;{search}&quot; is Available
        </div>
      }
      {
        searchMode ?
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 space-x-3 space-y-4 py-8">
            {searchProducts.map((product, index) => (
              <Product
                key={index}
                id={product.id}
                image={product.thumbnail}
                name={product.title}
                price={product.price}
                discountp={product.discountPercentage}
              />
            ))}
          </div>
          :
          <div className="space-y-15 mt-6">
            {CategorizedProducts.map((category, i) => {
              if (category.prod.length>5) {
                return (
                  <div key={i}>
                    <h1 className="font-bold text-white text-2xl">{category.title}</h1>
                    <div className="flex gap-x-3 overflow-x-auto overflow-y-hidden for-overflow">
                      <div className="flex mt-2 gap-x-3 animate-move">
                        {
                          category.prod.map((product, index) => (
                            <div key={index} className="flex">
                              <Product
                                key={index}
                                id={product.id}
                                image={product.thumbnail}
                                name={product.title}
                                price={product.price}
                                discountp={product.discountPercentage}
                              />
                            </div>
                          ))
                        }
                      </div>
                      <div aria-hidden className="flex mt-2 gap-x-3 animate-move">
                        {
                          category.prod.map((product, index) => (
                            <div key={index} className="flex">
                              <Product
                                key={index}
                                id={product.id}
                                image={product.thumbnail}
                                name={product.title}
                                price={product.price}
                                discountp={product.discountPercentage}
                              />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )
              } else if (category.prod.length<5) {
                return (
                  <div key={i} className="space-y-5">
                    <h1 className="font-bold text-white text-2xl">{category.title}</h1>
                    <div className="flex mt-2 justify-around">
                      {
                        category.prod.map((product, index) => (
                          <div key={index} className="flex">
                            <Product
                              key={index}
                              id={product.id}
                              image={product.thumbnail}
                              name={product.title}
                              price={product.price}
                              discountp={product.discountPercentage}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            })}
          </div>
      }
    </div>
  )
}