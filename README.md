# RoleDash - Role-Based Business Intelligence Dashboard

A comprehensive Angular UI demo project showcasing role-based access control, interactive dashboards, data visualization, and modern web development practices.

## 🚀 Features

### 🔐 Authentication & Role-Based Access
- **Login System**: Simple username + role selection
- **4 User Roles**: MCHB, RBM, ZBM, NBM with different permissions
- **Role-Based UI**: Dynamic content based on user role
- **Route Protection**: AuthGuard prevents unauthorized access

### 📊 Interactive Dashboards
- **Role-Specific KPIs**: Different metrics for each role
- **Real-time Charts**: Line, Bar, Pie, Doughnut, and Radar charts
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dynamic Data**: Mock data with realistic business metrics

### 📈 Data Visualization
- **Chart.js Integration**: Professional chart library
- **Multiple Chart Types**: 
  - Line charts for trends
  - Bar charts for comparisons
  - Pie/Doughnut charts for distributions
  - Radar charts for multi-dimensional data
- **Interactive Elements**: Hover effects and responsive design

### 📋 Reports & Analytics
- **Data Tables**: Sortable, searchable, paginated tables
- **Advanced Filtering**: Multi-criteria filtering system
- **Export Capabilities**: CSV export functionality
- **Performance Indicators**: Color-coded achievement levels

### 📁 File Upload (NBM Only)
- **Drag & Drop Interface**: Modern file upload experience
- **File Validation**: Type and size validation
- **Progress Tracking**: Real-time upload progress
- **Batch Processing**: Multiple file uploads
- **Error Handling**: Comprehensive validation messages

## 🏗️ Technical Stack

- **Frontend**: Angular 18+ with Standalone Components
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Chart.js with ng2-charts wrapper
- **Routing**: Angular Router with guards
- **State Management**: RxJS for reactive programming
- **Build Tool**: Angular CLI with Vite
- **SSR**: Server-Side Rendering support

## 📁 Project Structure

```
src/app/
├── components/
│   ├── login/                 # Login component
│   ├── dashboard/             # Role-specific dashboards
│   ├── charts/               # Chart components
│   ├── reports/              # Reports and tables
│   ├── upload/               # File upload (NBM only)
│   └── dashboard-wrapper.component.ts
├── shared/                   # Reusable UI components
│   ├── card.component.ts     # Generic card wrapper
│   ├── kpi-card.component.ts # KPI display cards
│   └── layout.component.ts   # Main layout with sidebar
├── services/
│   └── auth.service.ts       # Authentication service
├── guards/
│   └── auth.guard.ts         # Route protection
└── app.routes.ts            # Application routing
```

## 🎯 Role-Based Features

### MCHB (Multi Channel Brand Manager)
- **National KPI Overview**: Total revenue, active channels, market share
- **Strategic Charts**: Channel distribution, product categories, market analysis
- **Brand Performance**: Brand score and competitive analysis

### RBM (Regional Business Manager) 
- **Regional Metrics**: Regional revenue, territories, target achievement
- **Team Performance**: Manager and territory performance tracking
- **Comparative Analysis**: Regional performance comparisons

### ZBM (Zonal Business Manager)
- **Zone-Specific Data**: Zone revenue, territories, growth metrics
- **Advanced Filters**: Territory, product, and time period filters
- **Territory Management**: Individual territory performance tracking

### NBM (National Business Manager)
- **Executive Dashboard**: Complete business overview
- **Data Management**: File upload and data processing capabilities
- **Comprehensive Analytics**: All charts and reports access
- **Data Quality Monitoring**: Upload validation and error tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RoleDash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:4200`

### Demo Login

Use any username with one of these roles:
- **MCHB**: Multi Channel Brand Manager
- **RBM**: Regional Business Manager  
- **ZBM**: Zonal Business Manager
- **NBM**: National Business Manager

## 🎨 UI/UX Features

### Design System
- **Consistent Colors**: Blue primary, green success, red warning palette
- **Typography**: Inter font with clear hierarchy
- **Spacing**: 8px grid system for consistent spacing
- **Shadows**: Subtle shadows for depth and hierarchy

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid and Flexbox for layouts
- **Touch Friendly**: Large touch targets and gestures

### Interactive Elements
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Progress indicators and skeleton screens
- **Form Validation**: Real-time validation with clear error messages
- **Toast Notifications**: Success and error notifications

## 📊 Sample Data

The application includes realistic mock data:
- **50+ Territory Records**: Complete sales and performance data
- **Multiple Regions**: North, South, East, West, Central regions
- **Performance Metrics**: Achievement percentages, sales figures
- **Time Series Data**: Monthly and quarterly trends
- **Manager Information**: Realistic manager names and assignments

## 🔧 Customization

### Adding New Roles
1. Update the `User` interface in `auth.service.ts`
2. Add role-specific logic in `dashboard.component.ts`
3. Update route permissions in `auth.guard.ts`
4. Add new dashboard sections as needed

### Adding New Charts
1. Create chart data in component
2. Use the `ChartComponent` with appropriate type
3. Configure chart options for styling
4. Add responsive design considerations

### Styling Customization
1. Update `tailwind.config.js` for theme changes
2. Modify component-specific styles
3. Update color schemes in shared components
4. Adjust responsive breakpoints as needed

## 📱 Mobile Responsiveness

- **Responsive Tables**: Horizontal scroll on mobile
- **Collapsible Sidebar**: Hidden on mobile with toggle
- **Touch Gestures**: Swipe and tap optimized
- **Mobile Navigation**: Optimized navigation patterns

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Build with SSR
```bash
npm run build:ssr
```

### Serve Production Build
```bash
npm run serve:ssr
```

## 🔮 Future Enhancements

- **Real API Integration**: Connect to actual backend services
- **Advanced Filtering**: More sophisticated filter options
- **Data Export**: PDF and Excel export capabilities
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Charts**: More chart types and customization options
- **User Management**: Full user administration system
- **Audit Logs**: Track user actions and data changes
- **Advanced Analytics**: Machine learning insights and predictions

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions and support, please create an issue in the repository.

---

**RoleDash** - Showcasing modern Angular development with role-based dashboards and interactive data visualization.
