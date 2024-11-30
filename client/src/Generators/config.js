

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const registerFormControls = [
  {
    name: "userName",
    label: "Username",
    placeholder: "Enter your userName",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const AdminNavigationButtons = [
  { path: "dashboard", label: "Dashboard" },
  { path: "products", label: "Products" },
  { path: "orders", label: "Orders" },
  
];

export const ProductSheetControls = [
  {
    label: "Title",
    placeholder: "product name",
    type: "text",
    componentType: "input",
    name: "title",
  },
  {
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
    name: "description",
  },
  {
    label: "Category",
    placeholder: "Select Category",
    componentType: "select",
    name: "category",
    options:[
      { "id": "men", "label": "Men" },
      { "id": "women", "label": "Women" },
      { "id": "kids", "label": "Kids" }
  ]
  
  },
  {
    label: "Brand",
    placeholder: "Select Brand",
    componentType: "select",
    name: "brand",
    options:[
      { "id": "nike", "label": "Nike" },
      { "id": "puma", "label": "Puma" },
      { "id": "adida", "label": "Adidas" },
      { "id": "fila", "label": "Fila" }
  ]
  
  },
  {
    label: "Price",
    placeholder: "$0",
    type: "number",
    componentType: "input",
    name: "price",
  },
  {
    label: "Sale Price",
    placeholder: "$0",
    type: "number",
    componentType: "input",
    name: "salePrice",
  },
  {
    label: "In Stock",
    placeholder: "enter qunatity >0",
    type: "number",
    componentType: "input",
    name: "totalStock",
  },





];

export const shopMenuItems = [
  {
    id:'home',
    label:'Home',
    path:'/shop'
  },
  {
    id:'product',
    label:'Product',
    path:'/shop/listing'},
  {
    id:'men',
    label:'Men',
    path:'/shop/listing'
  },
  {
    id:'women',
    label:'Women',
    path:'/shop/listing'
  },
  {
    id:'kids',
    label:'Kids',
    path:'/shop/listing'
  },
  {
    id:'accessories',
    label:'Accessories',
    path:'/shop/listing'
  },
  {
    id:'footwear',
    label:'Footwear',
    path:'/shop/listing'
  },
  {
    id:'search',
    label:'Search',
    path:'/shop/search'
  }
]

export const filterOptions ={
  category:[
    {id: "men", label: "Men" },
    {id: "women", label: "Women" },
    {id: "kids", label: "Kids" },
    {id: "accessories", label: "Accessories" },
    {id: "footwear", label: "Footwear" },
  ],
  brand:[
    {id: "nike", label: "Nike" },
    {id: "adidas", label: "Adidas" },
    {id: "levi", label: "Levi's" },
    {id: "puma", label: "Puma" },
    {id: "zara", label: "Zara" },
    {id: "h&m", label: "H&M" },
  ]
}

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressControls = [
  {
    label:'Address',
    name:'address',
    componentType:'input',
    type:'text',
    placeholder:'input address'
  },
  {
    label:'City',
    name:'city',
    componentType:'input',
    type:'text',
    placeholder:'input city'
  },
  {
    label:'Pincode',
    name:'pincode',
    componentType:'input',
    type:'text',
    placeholder:'input address'
  },
  {
    label:'Phone',
    name:'phone',
    componentType:'input',
    type:'text',
    placeholder:'input address'
  },
  {
    label:'Note',
    name:'note',
    componentType:'input',
    type:'text',
    placeholder:'input address'
  },
]