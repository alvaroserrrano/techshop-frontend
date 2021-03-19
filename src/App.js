import { HashRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import ProductEdit from './pages/ProductEdit';
import ProductList from './pages/ProductList';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import UserEdit from './pages/UserEdit';
import UserList from './pages/UserList';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <div className='container'>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={Order} />
          <Route path='/payment' component={Payment} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />

          <Route path='/admin/userlist' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />

          <Route path='/admin/productlist' component={ProductList} />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />

          <Route path='/admin/orderlist' component={OrderList} />
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
