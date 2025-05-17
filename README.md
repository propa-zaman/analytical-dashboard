# Analytics Dashboard

![Analytics Dashboard](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M4Drtc2hpm09desNY3ElBer2ciCYRT.png)

## Overview

Analytics Dashboard is a comprehensive full-stack web application built with Next.js that provides powerful data visualization and customer analytics capabilities. The dashboard offers interactive charts, detailed reports, customer management, and advanced analytics features in an intuitive interface with both light and dark modes.

This project demonstrates modern web development practices using Next.js, React, TypeScript, and Tailwind CSS, with a focus on responsive design, accessibility, and performance.

## Demo

### Live Demo
[Live Demo Link] (placeholder)

### Demo Credentials
- **Admin User**: admin@example.com / password
- **Sales User**: sales@example.com / password
- **Viewer**: viewer@example.com / password

## Features

### Dashboard Overview
- **Key Metrics Cards**: Quick view of important statistics
- **Interactive Charts**: Visualize customer data with pie, bar, and line charts
- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Mode**: Toggle between themes

### Customer Management
- **Customer Database**: Complete listing with search and filter
- **CRUD Operations**: View, edit, and delete customer records
- **Customer Segmentation**: Analyze customer groups
- **Demographics Analysis**: Visualize customer demographics

### Advanced Analytics
- **Correlation Analysis**: Identify relationships between data points
- **Trend Analysis**: Track changes over time
- **Division Comparison**: Compare performance across regions
- **Anomaly Detection**: Identify outliers in your data

### Reports
- **Executive Summary**: High-level overview for decision makers
- **Customer Segment Reports**: Detailed analysis of customer groups
- **Regional Performance**: Geographic analysis of customer data
- **Export Options**: Save reports in various formats (simulated)

### Settings & Preferences
- **Profile Management**: Update user information
- **Appearance Settings**: Customize the dashboard look and feel
- **Theme Customization**: Choose between light, dark, or system theme

### Database Visualization
- **ERD Diagram**: Visual representation of database schema
- **Table Relationships**: Understand data connections

## Technologies Used

### Frontend
- **React 18**: UI library for building component-based interfaces
- **Next.js 15**: React framework with server-side rendering and API routes
- **TypeScript**: Typed JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built on Radix UI
- **Recharts**: Composable chart library for data visualization
- **next-themes**: Theme management for Next.js

### Backend
- **Next.js App Router**: File-based routing system
- **Server Components**: Server-side rendering for improved performance
- **Server Actions**: Server-side data operations
- **API Routes**: RESTful API endpoints

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## Installation

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/propa-zaman/analytics-dashboard.git
cd analytics-dashboard
```
2. Install dependencies:
```bash
 npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Project Structure
```bash
/app                    # Next.js App Router pages
  /dashboard            # Dashboard routes
    /analytics          # Analytics page
    /customers          # Customers page
    /erd                # Database schema page
    /reports            # Reports page
    /settings           # Settings page
  /layout.tsx           # Root layout with providers
  /page.tsx             # Login page
/components             # React components
  /dashboard            # Dashboard-specific components
    /charts             # Chart components
    /settings           # Settings components
    /customer-*.tsx     # Customer-related components
  /ui                   # UI components from shadcn
/context                # React context providers
  /auth-context.tsx     # Authentication context
/lib                    # Utility functions and server actions
  /actions.ts           # Server actions
  /data.ts              # Mock data and data utilities
  /utils.ts             # Helper functions
/public                 # Static assets
```
## Usage Guide

### Authentication

The application starts with a login page. Use one of the demo credentials to log in:
- **Admin User**: admin@example.com / password (full access)
- **Sales User**: sales@example.com / password (limited editing)
- **Viewer**: viewer@example.com / password (read-only access)

### Navigation

The sidebar provides navigation to different sections of the dashboard:
- **Dashboard**: Overview with key metrics and charts
- **Customers**: Customer management and segmentation
- **Analytics**: Advanced data analysis tools
- **Reports**: Printable reports and summaries
- **ERD**: Database schema visualization
- **Settings**: User profile and appearance settings

### Filtering Data

Use the filter bar at the top of most pages to filter data by:
- Division
- Gender
- Marital Status
- Age Range
- Income Range

### Customer Management

On the Customers page, you can:
1. View the complete customer database
2. Click on a customer to view details
3. Edit customer information (Admin and Sales roles)
4. Delete customers (Admin role only)

### Customizing the Dashboard

In the Settings page, you can:
1. Update your profile information
2. Change the theme (Light/Dark/System)
3. Adjust appearance settings
4. Configure accessibility options
## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

---

## Contact

Your Name - propazaman12@gmailcom

Project Link: [https://github.com/propa-zaman/analytical-dashboard](https://github.com/propa-zaman/analytical-dashboard)