import React, { useState } from 'react';
import { 
  UserRole, 
  PublicTab, 
  Notice, 
  LeaveRequest, 
  AdmissionInquiry, 
  StudyMaterial, 
  Assignment 
} from './types';
import { 
  COLLEGE_INFO, 
  INITIAL_STUDENT_PROFILE, 
  STUDENT_ATTENDANCE, 
  INITIAL_NOTICES, 
  INITIAL_STUDY_MATERIALS, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_LEAVES, 
  INITIAL_ADMISSION_INQUIRIES 
} from './data/mockData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { DepartmentsPage } from './components/public/DepartmentsPage';
import { CoursesPage } from './components/public/CoursesPage';
import { AdmissionsPage } from './components/public/AdmissionsPage';
import { FeesPage } from './components/public/FeesPage';
import { PlacementsPage } from './components/public/PlacementsPage';
import { EventsNoticesPage } from './components/public/EventsNoticesPage';
import { GalleryPage } from './components/public/GalleryPage';
import { ContactPage } from './components/public/ContactPage';
import { StudentPortal } from './components/student/StudentPortal';
import { FacultyPortal } from './components/faculty/FacultyPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { DjangoCompanionModal } from './components/guide/DjangoCompanionModal';
import { LoginModal } from './components/auth/LoginModal';

export default function App() {
  // Navigation & Role State
  const [currentPublicTab, setCurrentPublicTab] = useState<PublicTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isStudentPortalActive, setIsStudentPortalActive] = useState<boolean>(false);

  // Modals State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isDjangoGuideOpen, setIsDjangoGuideOpen] = useState<boolean>(false);
  const [selectedNoticeForModal, setSelectedNoticeForModal] = useState<Notice | null>(null);

  // Reactive Data Stores (Student, Faculty, Admin workflows)
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [materials, setMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>(INITIAL_ADMISSION_INQUIRIES);
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT_PROFILE);

  // Handlers
  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    if (role !== 'guest') {
      setIsStudentPortalActive(true);
    } else {
      setIsStudentPortalActive(false);
    }
  };

  const handleOpenNotice = (notice: Notice) => {
    setSelectedNoticeForModal(notice);
  };

  const handleCloseNoticeModal = () => {
    setSelectedNoticeForModal(null);
  };

  const handleOpenPortalFromCTA = () => {
    if (userRole === 'guest') {
      setIsLoginModalOpen(true);
    } else {
      setIsStudentPortalActive(true);
    }
  };

  // Student Actions
  const handleSubmitAssignment = (asgId: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === asgId) {
        return {
          ...a,
          status: 'Submitted',
          submittedDate: new Date().toISOString().split('T')[0]
        };
      }
      return a;
    }));
  };

  const handleAddLeave = (newLeave: LeaveRequest) => {
    setLeaves(prev => [newLeave, ...prev]);
  };

  // Faculty Actions
  const handleAddStudyMaterial = (newMat: StudyMaterial) => {
    setMaterials(prev => [newMat, ...prev]);
  };

  // Admin Actions
  const handlePostNotice = (newNotice: Notice) => {
    setNotices(prev => [newNotice, ...prev]);
  };

  const handleApproveLeave = (leaveId: string, remarks: string) => {
    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        return { ...l, status: 'Approved', remarks };
      }
      return l;
    }));
  };

  const handleRejectLeave = (leaveId: string) => {
    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        return { ...l, status: 'Rejected', remarks: 'Declined by administration' };
      }
      return l;
    }));
  };

  const handleAddInquiry = (newInquiry: AdmissionInquiry) => {
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const handleUpdateInquiryStatus = (inquiryId: string, status: AdmissionInquiry['status']) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === inquiryId) {
        return { ...inq, status };
      }
      return inq;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Universal Top Navigation */}
      <Navbar
        currentPublicTab={currentPublicTab}
        onSelectPublicTab={setCurrentPublicTab}
        userRole={userRole}
        onSetUserRole={handleSelectRole}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenDjangoGuide={() => setIsDjangoGuideOpen(true)}
        isStudentPortalActive={isStudentPortalActive}
        onToggleStudentPortal={setIsStudentPortalActive}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {isStudentPortalActive ? (
          /* Role-based Portals */
          <>
            {userRole === 'student' && (
              <StudentPortal
                profile={studentProfile}
                attendanceList={STUDENT_ATTENDANCE}
                materials={materials}
                assignments={assignments}
                leaves={leaves}
                latestNotices={notices}
                onSubmitAssignment={handleSubmitAssignment}
                onAddLeave={handleAddLeave}
                onBackToPublic={() => setIsStudentPortalActive(false)}
                onOpenNotice={handleOpenNotice}
              />
            )}

            {userRole === 'faculty' && (
              <FacultyPortal
                onBackToPublic={() => setIsStudentPortalActive(false)}
                onAddStudyMaterial={handleAddStudyMaterial}
                onPostNotice={handlePostNotice}
              />
            )}

            {userRole === 'admin' && (
              <AdminPortal
                leaves={leaves}
                onApproveLeave={handleApproveLeave}
                onRejectLeave={handleRejectLeave}
                inquiries={inquiries}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onPostNotice={handlePostNotice}
                onBackToPublic={() => setIsStudentPortalActive(false)}
              />
            )}
          </>
        ) : (
          /* Public Web Pages */
          <>
            {currentPublicTab === 'home' && (
              <HomePage
                onSelectTab={setCurrentPublicTab}
                onOpenNotice={handleOpenNotice}
                onOpenPortal={handleOpenPortalFromCTA}
                onOpenDjangoGuide={() => setIsDjangoGuideOpen(true)}
              />
            )}

            {currentPublicTab === 'about' && <AboutPage />}
            {currentPublicTab === 'departments' && <DepartmentsPage />}
            {currentPublicTab === 'courses' && <CoursesPage onSelectTab={setCurrentPublicTab} />}
            {currentPublicTab === 'admissions' && <AdmissionsPage onAddInquiry={handleAddInquiry} />}
            {currentPublicTab === 'fees' && <FeesPage />}
            {currentPublicTab === 'placements' && <PlacementsPage />}
            {currentPublicTab === 'events-notices' && (
              <EventsNoticesPage
                onOpenNoticeModal={handleOpenNotice}
                selectedNoticeModal={selectedNoticeForModal}
                onCloseNoticeModal={handleCloseNoticeModal}
              />
            )}
            {currentPublicTab === 'gallery' && <GalleryPage />}
            {currentPublicTab === 'contact' && <ContactPage />}
          </>
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onSelectTab={setCurrentPublicTab}
        onOpenDjangoGuide={() => setIsDjangoGuideOpen(true)}
        onOpenPortal={handleOpenPortalFromCTA}
      />

      {/* Django Architecture Blueprint & Code Companion Modal */}
      <DjangoCompanionModal
        isOpen={isDjangoGuideOpen}
        onClose={() => setIsDjangoGuideOpen(false)}
      />

      {/* Authentication & Role Picker Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSelectRole={handleSelectRole}
      />
    </div>
  );
}
