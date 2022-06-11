import Orders from '../containers/Admin/Orders'
import Offers from '../containers/Offers/Offers'
import Products from '../containers/Porducts'

export const categoryOptions = [
  {
    id: 1,
    title: 'Prawn & Squid',
  },
  {
    id: 2,
    title: 'Poultry and Meet',
  },
  {
    id: 4,
    title: 'Rice & Flour',
  },
  {
    id: 5,
    title: 'Frozen Food',
  },
  {
    id: 6,
    title: 'Grocery',
  },
  {
    id: 7,
    title: 'Dairy &Mineral',
  },
  {
    id: 8,
    title: 'Packaging',
  },
  {
    id: 9,
    title: 'Cleaning Material',
  },
]
export const leftSideBarOptions = [
  {
    id: 1,
    title: 'Prawn & Squid',
    component: Products,
  },
  {
    id: 2,
    title: 'Poultry and Meet',
    component: Products,
  },
  {
    id: 4,
    title: 'Rice & Flour',
    component: Products,
  },
  {
    id: 5,
    title: 'Frozen Food',
    component: Products,
  },
  {
    id: 6,
    title: 'Grocery',
    component: Products,
  },
  {
    id: 7,
    title: 'Dairy & Mineral',
    component: Products,
  },
  {
    id: 8,
    title: 'Packaging',
    component: Products,
  },
  {
    id: 9,
    title: 'Cleaning Material',
    component: Products,
  },
  {
    id: 10,
    title: 'My Order',
    component: Orders,
    authorized: true,
  },
  {
    id: 11,
    title: 'Offer %',
    component: Offers,
  },
]
