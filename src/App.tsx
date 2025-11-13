import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import LeadConsultation from './pages/LeadConsultation'
import DocumentReviewList from './pages/DocumentReviewList'
import DocumentReviewDetail from './pages/DocumentReviewDetail'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/leads" element={<LeadConsultation />} />
          <Route path="/document-reviews" element={<DocumentReviewList />} />
          <Route path="/document-reviews/:id" element={<DocumentReviewDetail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

