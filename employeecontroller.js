import { Request, Response } from 'express';
import prisma from '../db';
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error: any) {
    console.error('Error fetching employees:', error.message);
    // As a fallback for local bootstrapping without DB, return mock data
    res.json([
      {
        id: 1,
        employeeCode: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@med360.com',
        phoneNumber: '+254712345678',
        designation: 'Medical Officer',
        department: 'Outpatient Clinic',
        baseSalary: 150000.00,
        status: 'ACTIVE'
      },
      {
        id: 2,
        employeeCode: 'EMP002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@med360.com',
        phoneNumber: '+254723456789',
        designation: 'Nursing Officer',
        department: 'Maternity Ward',
        baseSalary: 95000.00,
        status: 'ACTIVE'
      }
    ]);
  }
};
export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) }
    });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error: any)

}

