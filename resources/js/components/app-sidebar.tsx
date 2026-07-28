import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Building2,
    Monitor,
    Phone,
    UserPlus,
    Users,
    Heart,
    Briefcase,
    CreditCard,
    Award,
    GraduationCap,
    Video,
    FileText,
    ClipboardList,
    ClipboardCheck,
    Eye,
    Calendar,
    Mail,
    DollarSign,
    MessageSquare,
    BarChart3,
    Settings,
    Library,
    CalendarCheck,
    Shield,
    ShieldCheck,
    KeyRound,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
        items: [
            {
                title: 'Analytics',
                url: '/dashboard/analytics',
                icon: BarChart3,
                items: [
                    { title: 'Overview', url: '/dashboard/analytics/overview' },
                    { title: 'Trends', url: '/dashboard/analytics/trends' },
                    { title: 'Reports', url: '/dashboard/analytics/reports' },
                ],
            },
            { title: 'Summary', url: '/dashboard/summary' },
            { title: 'Activities', url: '/dashboard/activities' },
        ],
    },
    {
        title: 'Institutions',
        url: '/institutions',
        icon: Building2,
        items: [
            {
                title: 'Manage Institutions',
                url: '/institutions/manage',
                items: [
                    { title: 'Add New', url: '/institutions/manage/add' },
                    { title: 'Edit', url: '/institutions/manage/edit' },
                    { title: 'Delete', url: '/institutions/manage/delete' },
                ],
            },
            { title: 'Institution List', url: '/institutions/list' },
            { title: 'Branches', url: '/institutions/branches' },
        ],
    },
    {
        title: 'Frontend',
        url: '/frontend',
        icon: Monitor,
    },
    {
        title: 'Reception',
        url: '/reception',
        icon: Phone,
        items: [
            { title: 'Visitor Log', url: '/reception/visitor-log' },
            { title: 'Appointments', url: '/reception/appointments' },
            { title: 'Call Log', url: '/reception/call-log' },
        ],
    },
    {
        title: 'Admission',
        url: '/admission',
        icon: UserPlus,
        items: [
            {
                title: 'Applications',
                url: '/admission/applications',
                items: [
                    { title: 'New Applications', url: '/admission/applications/new' },
                    { title: 'Approved', url: '/admission/applications/approved' },
                    { title: 'Rejected', url: '/admission/applications/rejected' },
                ],
            },
            { title: 'Enrollment', url: '/admission/enrollment' },
            { title: 'Documents', url: '/admission/documents' },
        ],
    },
    {
        title: 'Student Details',
        url: '/student-details',
        icon: Users,
        items: [
            { title: 'All Students', url: '/student-details/all' },
            { title: 'Student Profile', url: '/student-details/profile' },
            { title: 'Guardian Details', url: '/student-details/guardian' },
        ],
    },
    {
        title: 'Parents',
        url: '/parents',
        icon: Heart,
    },
    {
        title: 'Employee',
        url: '/employee',
        icon: Briefcase,
        items: [
            {
                title: 'Staff Management',
                url: '/employee/staff-management',
                items: [
                    { title: 'Add Staff', url: '/employee/staff-management/add' },
                    { title: 'Staff List', url: '/employee/staff-management/list' },
                ],
            },
            { title: 'Attendance', url: '/employee/attendance' },
            { title: 'Payroll', url: '/employee/payroll' },
        ],
    },
    {
        title: 'Card Management',
        url: '/card-management',
        icon: CreditCard,
    },
    {
        title: 'Certificate',
        url: '/certificate',
        icon: Award,
    },
    {
        title: 'Human Resource',
        url: '/human-resource',
        icon: Users,
        items: [
            { title: 'Recruitment', url: '/human-resource/recruitment' },
            { title: 'Leave Management', url: '/human-resource/leave' },
            { title: 'Performance', url: '/human-resource/performance' },
        ],
    },
    {
        title: 'Academic',
        url: '/academic',
        icon: GraduationCap,
        items: [
            {
                title: 'Classes',
                url: '/academic/classes',
                items: [
                    { title: 'Class List', url: '/academic/classes/list' },
                    { title: 'Schedule', url: '/academic/classes/schedule' },
                ],
            },
            { title: 'Subjects', url: '/academic/subjects' },
            { title: 'Timetable', url: '/academic/timetable' },
            { title: 'Syllabus', url: '/academic/syllabus' },
        ],
    },
    {
        title: 'Live Class Rooms',
        url: '/live-class-rooms',
        icon: Video,
    },
    {
        title: 'Content Management',
        url: '/content-management',
        icon: FileText,
        items: [
            { title: 'Course Content', url: '/content-management/courses' },
            { title: 'Study Material', url: '/content-management/study-material' },
            { title: 'Assignments', url: '/content-management/assignments' },
        ],
    },
    {
        title: 'Assignment',
        url: '/assignment',
        icon: ClipboardList,
    },
    {
        title: 'Examination',
        url: '/examination',
        icon: ClipboardCheck,
        items: [
            {
                title: 'Manage Exams',
                url: '/examination/manage',
                items: [
                    { title: 'Create Exam', url: '/examination/manage/create' },
                    { title: 'Exam List', url: '/examination/manage/list' },
                ],
            },
            { title: 'Results', url: '/examination/results' },
            { title: 'Grade Book', url: '/examination/grade-book' },
        ],
    },
    {
        title: 'Online Exam',
        url: '/online-exam',
        icon: Monitor,
    },
    {
        title: 'Supervision',
        url: '/supervision',
        icon: Eye,
    },
    {
        title: 'Attendance',
        url: '/attendance',
        icon: CalendarCheck,
        items: [
            { title: 'Mark Attendance', url: '/attendance/mark' },
            { title: 'Attendance Report', url: '/attendance/report' },
            { title: 'Monthly Summary', url: '/attendance/summary' },
        ],
    },
    {
        title: 'Library',
        url: '/library',
        icon: Library,
        items: [
            { title: 'Book List', url: '/library/books' },
            { title: 'Issue/Return', url: '/library/issue-return' },
            { title: 'Library Card', url: '/library/card' },
        ],
    },
    {
        title: 'Events',
        url: '/events',
        icon: Calendar,
    },
    {
        title: 'Bulk Sms And Email',
        url: '/bulk-sms-and-email',
        icon: Mail,
    },
    {
        title: 'Student Accounting',
        url: '/student-accounting',
        icon: DollarSign,
        items: [
            { title: 'Fees Collection', url: '/student-accounting/fees' },
            { title: 'Payment History', url: '/student-accounting/payments' },
            { title: 'Due List', url: '/student-accounting/due' },
        ],
    },
    {
        title: 'Office Accounting',
        url: '/office-accounting',
        icon: DollarSign,
    },
    {
        title: 'Message',
        url: '/message',
        icon: MessageSquare,
    },
    {
        title: 'Reports',
        url: '/reports',
        icon: BarChart3,
        items: [
            { title: 'Academic Reports', url: '/reports/academic' },
            { title: 'Financial Reports', url: '/reports/financial' },
            { title: 'Attendance Reports', url: '/reports/attendance' },
        ],
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
        items: [
            {
                title: 'General Settings',
                url: '/settings/general',
                items: [
                    { title: 'Site Config', url: '/settings/general/site' },
                    { title: 'Email Config', url: '/settings/general/email' },
                ],
            },
            { title: 'Permissions', url: '/settings/permissions' },
            { title: 'Roles', url: '/settings/roles' },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'User Management',
        icon: Folder,
        items: [
            {
                title: 'User',
                icon: Users,
                items: [
                    { title: 'View Users', url: '/user-management/users' },
                    { title: 'Create Users', url: '/user-management/users/create' },
                    // { title: 'Edit Users', url: '/user-management/users/edit' },
                    // { title: 'Delete Users', url: '/user-management/users/delete' },
                ],
            },
            {
                title: 'Role Management',
                icon: Shield,
                items: [
                    { title: 'View Roles', url: '/user-management/roles' },
                    { title: 'Create Roles', url: '/user-management/roles/create' },
                ],
            },
            {
                title: 'Permission Management',
                icon: KeyRound,
                items: [
                    { title: 'View Permissions', url: '/user-management/permissions' },
                    { title: 'Assign Permissions', url: '/user-management/permissions/assign' },
                ],
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                        
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent >
                <NavMain items={mainNavItems} label="Lms Library" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
