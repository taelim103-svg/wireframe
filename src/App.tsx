import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import LeadConsultation from './pages/LeadConsultation'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/leads" element={<LeadConsultation />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

