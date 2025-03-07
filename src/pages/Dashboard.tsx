// File: src/pages/Dashboard.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Calendar } from '@/components/ui/calendar';
import { Clock, Brain, Target, Activity } from 'lucide-react';

// Types
interface SubjectPerformance {
  subject: string;
  score: number;
  color: string;
}

interface WeeklyProgress {
  week: string;
  progress: number;
}

interface TopicAccuracy {
  name: string;
  value: number;
  color: string;
}

interface StudySession {
  date: Date;
  duration: number; // minutes
}

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeFilter, setTimeFilter] = useState("week");
  
  // Mock data
  const overallProgress = 68;
  
  const subjectBreakdown = [
    { subject: 'Math', progress: 85, color: '#4f46e5' },
    { subject: 'Science', progress: 72, color: '#06b6d4' },
    { subject: 'English', progress: 60, color: '#10b981' },
    { subject: 'History', progress: 45, color: '#f59e0b' },
  ];
  
  const subjectPerformance: SubjectPerformance[] = [
    { subject: 'Math', score: 85, color: '#4f46e5' },
    { subject: 'Science', score: 72, color: '#06b6d4' },
    { subject: 'English', score: 60, color: '#10b981' },
    { subject: 'History', score: 45, color: '#f59e0b' },
    { subject: 'Geography', score: 68, color: '#ec4899' },
  ];
  
  const weeklyProgress: WeeklyProgress[] = [
    { week: 'Week 1', progress: 30 },
    { week: 'Week 2', progress: 45 },
    { week: 'Week 3', progress: 52 },
    { week: 'Week 4', progress: 68 },
  ];
  
  const topicAccuracy: TopicAccuracy[] = [
    { name: 'Algebra', value: 30, color: '#4f46e5' },
    { name: 'Geometry', value: 20, color: '#06b6d4' },
    { name: 'Grammar', value: 15, color: '#10b981' },
    { name: 'Chemistry', value: 25, color: '#f59e0b' },
    { name: 'Physics', value: 10, color: '#ec4899' },
  ];
  
  const studySessions: StudySession[] = [
    { date: new Date(2025, 2, 1), duration: 60 },
    { date: new Date(2025, 2, 2), duration: 45 },
    { date: new Date(2025, 2, 4), duration: 90 },
    { date: new Date(2025, 2, 5), duration: 30 },
    { date: new Date(2025, 2, 7), duration: 60 },
  ];
  
  const totalStudyTime = studySessions.reduce((total, session) => total + session.duration, 0);
  const studyDays = studySessions.map(session => 
    new Date(session.date.getFullYear(), session.date.getMonth(), session.date.getDate()).getTime()
  );
  
  const weakAreas = [
    { topic: 'Trigonometry', subject: 'Math', score: 35 },
    { topic: 'Essay Writing', subject: 'English', score: 40 },
  ];

  // Helper function to determine if a date has a study session
  const hasStudySession = (date: Date) => {
    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return studyDays.includes(dateTime);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track your learning progress and performance</p>
        </div>
        
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Motivational Quote */}
      <div className="bg-blue-50 p-4 rounded-lg italic text-blue-600 border-l-4 border-blue-500">
        "The expert in anything was once a beginner. Track your progress and celebrate small wins!"
      </div>

      {/* Progress Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Progress with Circular Progress Bar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your learning journey so far</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-48 h-48">
              <CircularProgressbarWithChildren 
                value={overallProgress} 
                styles={buildStyles({
                  pathColor: '#4f46e5',
                  trailColor: '#e2e8f0'
                })}
              >
                <div className="text-center">
                  <strong className="text-3xl">{overallProgress}%</strong>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start pt-0">
            <p className="font-semibold mb-2">Subject Breakdown:</p>
            <div className="w-full space-y-2">
              {subjectBreakdown.map((subject) => (
                <div key={subject.subject} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>{subject.subject}</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${subject.progress}%`, 
                        backgroundColor: subject.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>

        {/* Study Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" /> Study Calendar
            </CardTitle>
            <CardDescription>Days you've studied are highlighted</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                studied: (date) => hasStudySession(date),
              }}
              modifiersClassNames={{
                studied: "bg-green-100 text-green-800 font-bold",
              }}
            />
          </CardContent>
        </Card>

        {/* Other Stats Cards */}
        <div className="space-y-4">
          {/* Total Study Time */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5" /> Total Study Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{Math.floor(totalStudyTime / 60)}</span>
                <span className="text-xl">hours</span>
                <span className="text-3xl font-bold ml-2">{totalStudyTime % 60}</span>
                <span className="text-xl">minutes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Across {studySessions.length} study sessions
              </p>
            </CardContent>
          </Card>

          {/* Weak Areas */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="h-5 w-5" /> Areas to Focus On
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weakAreas.map((area) => (
                <div key={area.topic} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{area.topic}</span>
                    <span className="text-muted-foreground text-sm">{area.subject}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-red-400" 
                      style={{ 
                        width: `${area.score}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-red-500">{area.score}% mastery</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Milestone */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-5 w-5" /> Next Milestone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Complete Algebra Module</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full bg-blue-500" 
                  style={{ 
                    width: '75%'
                  }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                75% - Estimated 2 more days to complete
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Analysis Section */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Performance Analysis</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your scores across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformance}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Score (%)">
                    {subjectPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart - Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Your learning progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyProgress}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    name="Progress (%)" 
                    stroke="#4f46e5" 
                    strokeWidth={2} 
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Topic Accuracy */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Topic Distribution</CardTitle>
            <CardDescription>Time spent across different topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicAccuracy}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topicAccuracy.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;