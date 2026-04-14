// Registration Model Interface
export interface Registration {
  id?: number;
  name: string;
  email: string;
  designation: string;
  course: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    details?: any[];
  };
  timestamp: string;
}

// Paginated Response Interface
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
  };
  timestamp: string;
}

// Registration Statistics Interface
export interface RegistrationStats {
  overview: {
    total_registrations: number;
    total_courses: number;
    total_locations: number;
    total_designations: number;
  };
  courseBreakdown: Array<{
    course: string;
    count: number;
  }>;
}
