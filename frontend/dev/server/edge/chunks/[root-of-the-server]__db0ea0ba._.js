(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__db0ea0ba._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/messages/ar.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"common":{"loading":"جاري التحميل...","error":"حدث خطأ","submit":"إرسال","cancel":"إلغاء","save":"حفظ","delete":"حذف","edit":"تعديل","back":"رجوع","search":"بحث","noResults":"لا توجد نتائج","required":"مطلوب","optional":"اختياري"},"nav":{"home":"الرئيسية","properties":"العقارات","contact":"اتصل بنا","listProperty":"أضف عقار","admin":"المسؤول"},"home":{"title":"ابحث عن عقارك المثالي","subtitle":"اكتشف عقارات مميزة في موقعك المفضل","featuredProperties":"عقارات مميزة","loadingProperties":"جاري تحميل العقارات...","noProperties":"لا توجد عقارات متاحة حالياً.","lookingForSpecific":"تبحث عن شيء محدد؟","browseListings":"تصفح قائمة العقارات الكاملة أو تواصل مع فريقنا للحصول على مساعدة شخصية","viewAllProperties":"عرض جميع العقارات","contactUs":"اتصل بنا"},"search":{"location":"الموقع","minPrice":"أقل سعر","maxPrice":"أعلى سعر","search":"بحث"},"properties":{"title":"العقارات المتاحة","found":"تم العثور على {count} عقار","loading":"جاري تحميل العقارات...","noFound":"لا توجد عقارات","goBackHome":"العودة للرئيسية","beds":"غرف نوم","baths":"حمامات","sqft":"متر مربع","featured":"مميز","interestedInProperty":"مهتم بهذا العقار؟","propertyTypes":{"house":"منزل","apartment":"شقة","condo":"شقة فاخرة","townhouse":"تاون هاوس","land":"أرض","commercial":"تجاري"}},"propertyDetail":{"propertyDetails":"تفاصيل العقار","bedrooms":"غرف النوم","bathrooms":"الحمامات","area":"المساحة","type":"النوع","status":"الحالة","description":"الوصف","location":"الموقع","viewOnMap":"عرض على الخريطة","available":"متاح","pending":"قيد الانتظار","sold":"مباع","rented":"مؤجر"},"inquiry":{"title":"مهتم بهذا العقار؟","yourName":"اسمك","yourEmail":"بريدك الإلكتروني","yourPhone":"رقم هاتفك","phoneOptional":"رقم هاتفك (اختياري)","message":"أخبرنا المزيد عن اهتمامك...","submit":"إرسال الاستفسار","submitting":"جاري الإرسال...","success":"تم إرسال الاستفسار!","successMessage":"سنتواصل معك قريباً بخصوص هذا العقار.","privacyNote":"نحن نحترم خصوصيتك. معلوماتك آمنة معنا.","error":"فشل إرسال الاستفسار. يرجى المحاولة مرة أخرى."},"contact":{"title":"تواصل معنا","subtitle":"لديك أسئلة؟ يسعدنا سماعك. أرسل لنا رسالة.","contactInfo":"معلومات التواصل","email":"البريد الإلكتروني","phone":"الهاتف","address":"العنوان","businessHours":"ساعات العمل","sendMessage":"أرسل لنا رسالة","name":"الاسم","yourMessage":"رسالتك","messagePlaceholder":"أخبرنا كيف يمكننا مساعدتك...","send":"إرسال الرسالة","sending":"جاري الإرسال...","messageSent":"تم إرسال الرسالة!","messageSuccess":"سنعود إليك قريباً."},"listProperty":{"title":"أضف عقارك","subtitle":"املأ التفاصيل أدناه لإنشاء إعلان عقاري جديد","basicInfo":"المعلومات الأساسية","propertyTitle":"عنوان العقار","propertyTitlePlaceholder":"مثال: منزل جميل 3 غرف في وسط المدينة","description":"الوصف","descriptionPlaceholder":"صف عقارك بالتفصيل...","address":"العنوان","addressPlaceholder":"123 الشارع الرئيسي، المدينة، الدولة 12345","price":"السعر","propertyType":"نوع العقار","propertyDetails":"تفاصيل العقار","bedrooms":"غرف النوم","bathrooms":"الحمامات","area":"المساحة (متر مربع)","images":"صور العقار","uploadImages":"رفع الصور","clickToUpload":"انقر للرفع أو اسحب وأفلت","imageFormats":"PNG, JPG, GIF حتى 10 ميجابايت","imagesSelected":"تم اختيار {count} صورة","primary":"رئيسية","createListing":"إنشاء الإعلان","creatingListing":"جاري إنشاء الإعلان...","uploadingImages":"جاري رفع الصور...","publishNote":"سيتم نشر عقارك فوراً بعد الإنشاء."},"admin":{"title":"لوحة التحكم","subtitle":"إدارة العقارات والاستفسارات ومعلومات التواصل","listNewProperty":"أضف عقار جديد","logout":"تسجيل الخروج","properties":"العقارات","inquiries":"الاستفسارات","contactInfo":"معلومات التواصل","noProperties":"لا توجد عقارات بعد","noInquiries":"لا توجد استفسارات بعد","deleteConfirm":"هل أنت متأكد من حذف هذا العقار؟","deleteSuccess":"تم حذف العقار بنجاح","updateSuccess":"تم تحديث معلومات التواصل بنجاح"},"adminLogin":{"title":"تسجيل دخول المسؤول","subtitle":"أدخل بيانات الاعتماد للوصول إلى لوحة التحكم","email":"البريد الإلكتروني","emailPlaceholder":"admin@propertylistings.com","password":"كلمة المرور","passwordPlaceholder":"أدخل كلمة المرور","login":"تسجيل الدخول","loggingIn":"جاري تسجيل الدخول...","error":"حدث خطأ أثناء تسجيل الدخول"},"editProperty":{"title":"تعديل العقار","subtitle":"تحديث تفاصيل العقار أدناه","updateProperty":"تحديث العقار","updating":"جاري التحديث...","currentImages":"الصور الحالية","addMoreImages":"إضافة المزيد من الصور","removeImage":"إزالة الصورة","setPrimary":"تعيين كصورة رئيسية"},"footer":{"copyright":"© {year} PropertyHub. جميع الحقوق محفوظة.","privacy":"سياسة الخصوصية","terms":"شروط الخدمة"},"language":{"en":"English","ar":"العربية","switchTo":"التبديل إلى {language}"}});}),
"[project]/messages/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"common":{"loading":"Loading...","error":"An error occurred","submit":"Submit","cancel":"Cancel","save":"Save","delete":"Delete","edit":"Edit","back":"Back","search":"Search","noResults":"No results found","required":"Required","optional":"Optional"},"nav":{"home":"Home","properties":"Properties","contact":"Contact","listProperty":"List Property","admin":"Admin"},"home":{"title":"Find Your Dream Property","subtitle":"Discover premium properties in your desired location","featuredProperties":"Featured Properties","loadingProperties":"Loading properties...","noProperties":"No properties available yet.","lookingForSpecific":"Looking for something specific?","browseListings":"Browse our complete property listings or contact our team for personalized assistance","viewAllProperties":"View All Properties","contactUs":"Contact Us"},"search":{"location":"Location","minPrice":"Min Price","maxPrice":"Max Price","search":"Search"},"properties":{"title":"Available Properties","found":"Found {count} properties","loading":"Loading properties...","noFound":"No properties found","goBackHome":"Go back home","beds":"Beds","baths":"Baths","sqft":"sqft","featured":"Featured","interestedInProperty":"Interested in this property?","propertyTypes":{"house":"House","apartment":"Apartment","condo":"Condo","townhouse":"Townhouse","land":"Land","commercial":"Commercial"}},"propertyDetail":{"propertyDetails":"Property Details","bedrooms":"Bedrooms","bathrooms":"Bathrooms","area":"Area","type":"Type","status":"Status","description":"Description","location":"Location","viewOnMap":"View on Map","available":"Available","pending":"Pending","sold":"Sold","rented":"Rented"},"inquiry":{"title":"Interested in this property?","yourName":"Your name","yourEmail":"Your email","yourPhone":"Your phone","phoneOptional":"Your phone (optional)","message":"Tell us more about your interest...","submit":"Send Inquiry","submitting":"Submitting...","success":"Inquiry Submitted!","successMessage":"We will contact you shortly about this property.","privacyNote":"We respect your privacy. Your information is safe with us.","error":"Failed to submit inquiry. Please try again."},"contact":{"title":"Get In Touch","subtitle":"Have questions? We would love to hear from you. Send us a message.","contactInfo":"Contact Information","email":"Email","phone":"Phone","address":"Address","businessHours":"Business Hours","sendMessage":"Send us a Message","name":"Name","yourMessage":"Message","messagePlaceholder":"Tell us how we can help...","send":"Send Message","sending":"Sending...","messageSent":"Message Sent!","messageSuccess":"We will get back to you shortly."},"listProperty":{"title":"List Your Property","subtitle":"Fill in the details below to create a new property listing","basicInfo":"Basic Information","propertyTitle":"Property Title","propertyTitlePlaceholder":"e.g., Beautiful 3 Bed Home in Downtown","description":"Description","descriptionPlaceholder":"Describe your property in detail...","address":"Address","addressPlaceholder":"123 Main St, City, State 12345","price":"Price","propertyType":"Property Type","propertyDetails":"Property Details","bedrooms":"Bedrooms","bathrooms":"Bathrooms","area":"Area (Sq Ft)","images":"Property Images","uploadImages":"Upload Images","clickToUpload":"Click to upload or drag and drop","imageFormats":"PNG, JPG, GIF up to 10MB","imagesSelected":"{count} image(s) selected","primary":"Primary","createListing":"Create Listing","creatingListing":"Creating listing...","uploadingImages":"Uploading images...","publishNote":"Your property will be published immediately after creation."},"admin":{"title":"Admin Dashboard","subtitle":"Manage your properties, inquiries, and contact information","listNewProperty":"List New Property","logout":"Logout","properties":"Properties","inquiries":"Inquiries","contactInfo":"Contact Info","noProperties":"No properties yet","noInquiries":"No inquiries yet","deleteConfirm":"Are you sure you want to delete this property?","deleteSuccess":"Property deleted successfully","updateSuccess":"Contact information updated successfully"},"adminLogin":{"title":"Admin Login","subtitle":"Enter your credentials to access the admin dashboard","email":"Email","emailPlaceholder":"admin@propertylistings.com","password":"Password","passwordPlaceholder":"Enter your password","login":"Login","loggingIn":"Logging in...","error":"An error occurred during login"},"editProperty":{"title":"Edit Property","subtitle":"Update the property details below","updateProperty":"Update Property","updating":"Updating...","currentImages":"Current Images","addMoreImages":"Add More Images","removeImage":"Remove Image","setPrimary":"Set as Primary"},"footer":{"copyright":"© {year} PropertyHub. All rights reserved.","privacy":"Privacy Policy","terms":"Terms of Service"},"language":{"en":"English","ar":"العربية","switchTo":"Switch to {language}"}});}),
"[project]/i18n.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "defaultLocale",
    ()=>defaultLocale,
    "locales",
    ()=>locales
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>");
;
const locales = [
    'en',
    'ar'
];
const defaultLocale = 'en';
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;
    // Ensure that the incoming `locale` is valid
    if (!locale || !locales.includes(locale)) {
        locale = defaultLocale;
    }
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "./messages/ar.json": {
                id: ()=>"[project]/messages/ar.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/messages/ar.json (json)"))
            },
            "./messages/en.json": {
                id: ()=>"[project]/messages/en.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/messages/en.json (json)"))
            }
        }).import(`./messages/${locale}.json`)).default
    };
});
}),
"[project]/i18n/routing.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link,
    "getPathname",
    ()=>getPathname,
    "redirect",
    ()=>redirect,
    "routing",
    ()=>routing,
    "usePathname",
    ()=>usePathname,
    "useRouter",
    ()=>useRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript) <export default as createNavigation>");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        'en',
        'ar'
    ],
    defaultLocale: 'en',
    localePrefix: 'always'
});
const { Link, redirect, usePathname, useRouter, getPathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"]);
const config = {
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - Static files
    matcher: [
        '/((?!api|_next|.*\\..*).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__db0ea0ba._.js.map