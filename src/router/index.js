import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import goods from "@/components/goods/goods";
import ratings from "@/components/ratings/ratings";
import seller from "@/components/seller/seller";
import news from "@/components/news/news";
import personal from "@/components/personal/personal";
import password from "@/components/password/password";
import message from "@/components/message/message";
import memo from "@/components/memo/memo";
import plan from "@/components/plan/plan";
import summary from "@/components/summary/summary";
import tendering from "@/components/tendering/tendering";
import cost from "@/components/cost/cost";
import law from "@/components/law/law";
import government from "@/components/government/government";
import newPurchaser from "@/components/newPurchaser/newPurchaser";
import projectApproval from "@/components/projectApproval/projectApproval";
import governmentDetails from "@/components/governmentDetails/governmentDetails";
import communication from "@/components/communication/communication";
import opening from "@/components/opening/opening";
import archives from "@/components/archives/archives";
import supplier from "@/components/supplier/supplier";
import addExpert from "@/components/addExpert/addExpert";
import login from "@/components/login/login";
import register from "@/components/register/register";
import management from "@/components/management/management";
import Default from "@/components/subrouter/Default/Default";
import Collection from "@/components/subrouter/Collection/Collection";
import Trace from "@/components/subrouter/Trace/Trace";
import project from "@/components/subrouter/project/project";
import newProject from "@/components/subrouter/newProject/newProject";
import template from "@/components/subrouter/template/template";
import purchaser from "@/components/subrouter/purchaser/purchaser";
import finance from "@/components/subrouter/finance/finance";
import expert from "@/components/subrouter/expert/expert";
import field from "@/components/subrouter/field/field";
import editCompany from "@/components/editCompany/editCompany";







const routes = [

    {
        path: "/", // path 设置为 “/” ，默认显示该页面
        component: login,
        name: "login"
    },

    { path: "/editCompany", name: 'editCompany', component: editCompany },
    { path: "/goods", name: 'goods', component: goods },

    {
        path: "/ratings",
        name: 'ratings',
        component: ratings,
        children: [{
                path: "purchaser",
                name: "purchaser",
                component: purchaser
            },
            {
                path: "finance",
                name: "finance",
                component: finance
            },
            {
                path: "expert",
                name: "expert",
                component: expert
            },
            {
                path: "field",
                name: "field",
                component: field
            },
            { path: '/', redirect: 'purchaser' }
        ]
    },
    { path: "/newPurchaser", name: "newPurchaser", component: newPurchaser },

    { path: "/seller", name: "seller", component: seller },
    { path: "/news", name: 'news', component: news },
    { path: "/personal", name: 'personal', component: personal },
    { path: "/password", name: 'password', component: password },
    {
        path: "/message",
        component: message,
        children: [{
                path: 'Default',
                name: 'Default',
                component: Default
            },
            {
                path: 'Collection',
                name: 'Collection',
                component: Collection
            },
            {
                path: 'Trace',
                name: 'Trace',
                component: Trace
            },
            { path: '/', redirect: 'Default' }
        ]
    },
    { path: "/memo", component: memo },
    { path: "/plan", name: "paln", component: plan },
    { path: "/summary", name: "summary", component: summary },
    { path: "/tendering", component: tendering },
    { path: "/cost", component: cost },
    { path: "/law", component: law },
    {
        path: "/government",
        component: government,
        children: [{
                path: 'project',
                name: 'project',
                component: project
            }, {
                path: 'newProject',
                name: 'newProject',
                component: newProject
            },
            {
                path: 'template',
                name: 'template',
                component: template
            },
            { path: '/', redirect: 'project' }

        ]
    },
    { path: "/projectApproval", component: projectApproval },
    { path: "/governmentDetails", name: "governmentDetails", component: governmentDetails },
    { path: "/communication", component: communication },
    { path: "/opening", component: opening },
    { path: "/archives", component: archives },
    { path: "/supplier", component: supplier },
    { path: "/addExpert", name: "addExpert", component: addExpert },
    { path: "/login", name: "login", component: login },
    { path: "/register", name: "register", component: register },
    {
        path: "/management",
        name: "management",
        component: management,
    },
    { path: '/', redirect: 'goods' }
];
//

const router = new VueRouter({
    routes
})

export default router