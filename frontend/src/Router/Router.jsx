import {
    createBrowserRouter
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import PostJobs from "../pages/PostJobs";
import MyJobs from "../pages/MyJobs";
import EstimatedSalary from "../pages/EstimatedSalary";
import UpdateJob from "../pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../pages/JobDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/", element: <Home /> },
            {path:"/post-jobs", element: <PostJobs />},
            {path:"/my-job", element: <MyJobs />},
            {path:"/salary", element: <EstimatedSalary />},
            {path:"/edit-job/:id", element: <UpdateJob />, loader: ({params}) => fetch(`https://career-page-5smu.onrender.com/all-jobs/${params.id}`)},
            {path:"/login", element: <Login />},
            {path:"/job/:id", element: <JobDetails />},
        ]
    },
]);

export default router;