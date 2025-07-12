"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var react_native_1 = require("react-native");
require("react-native-url-polyfill/auto");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = "https://sxazelezbxkqyjdghmyl.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YXplbGV6YnhrcXlqZGdobXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5OTcyNDQsImV4cCI6MjA2NjU3MzI0NH0.ayQxxb5sSjXIEl7InS2GKWjVp5K8r-sL5hYgClnQcUg";
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: async_storage_1.default,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: supabase_js_1.processLock,
    },
});
// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
react_native_1.AppState.addEventListener('change', function (state) {
    if (state === 'active') {
        exports.supabase.auth.startAutoRefresh();
    }
    else {
        exports.supabase.auth.stopAutoRefresh();
    }
});
