import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";

import {
  InstanceEdit,
  InstanceList,
  InstanceShow,
} from "./pages/instances";

import {
  PricingPage,
} from "./pages/instances/pricing_page";

import {
  OAuthRedirect
} from './oauthRedirect';

import {
  GithubOutlined,
  DiscordOutlined
} from "@ant-design/icons";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
              <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "instances",
                    list: "/instances",
                    edit: "/instances/edit/:id",
                    show: "/instances/show/:id",
                    meta: {
                      canDelete: false,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "QYjJFK-JXbpOy-mgs0fB",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Title={(props) => <ThemedTitleV2 {...props} text='My Dashboard' icon=''/>}
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="instances"/>}
                    />
                    <Route path="/instances">
                      <Route index element={<InstanceList />} />
                      <Route path="edit/:id" element={<InstanceEdit />} />
                      <Route path="show/:id" element={<InstanceShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/pricing">
                      <Route index element={<PricingPage />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          title=""
                          providers={[
                            {
                              name: 'github',
                              icon: (
                                <GithubOutlined
                                  style={{
                                    fontSize: 20,
                                  }}
                                />
                              ),
                              label: "Sign in with GitHub"
                            },
                            {
                              name: 'discord',
                              icon: (
                                <DiscordOutlined
                                  style={{
                                    fontSize: 20,
                                  }}
                                />
                              ),
                              label: "Sign in with Discord"
                            }
                          ]}
                        />
                      }
                    />
                    <Route path='/connect/:providerName/redirect' element={<OAuthRedirect />}/>
                    <Route
                      path="/register"
                      element={<AuthPage type="register" title="" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" title=""/>}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
