import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes';
import payrollRoutes from './routes/payrollRoutes';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'payroll-service', timestamp: new Date() });
});
// Routes
app.use('/api/hr', employeeRoutes);
app.use('/api/payroll', payrollRoutes);
// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});
app.listen(port, () => {
  console.log(`Payroll microservice listening on port ${port}`);
});