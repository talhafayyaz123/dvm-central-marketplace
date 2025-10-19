import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { baseApiUrl, imgApiUrl } from '../../utils/config'
import BreadCrumb from '../../components/UI/BreadCrumb/BreadCrumb'
import MetaTags from '../../components/UI/MetaTags/MetaTags'
import PageNotFound from '../../components/PageComponents/PageNotFound/PageNotFound'

import CategoryListing from '../../components/PageComponents/Slug/CategoryListing/CategoryListing'
import Product from '../../components/PageComponents/Slug/Product/Product'
import ProductListing from '../../components/PageComponents/Slug/ProudctListing/ProductListing'
import Vendor from '../../components/PageComponents/Slug/Vendor/Vendor'
import ServiceProviderDetail from '../../components/PageComponents/Slug/ServiceProviderDetail/ServiceProviderDetail'
import AllSearchResults from '../../components/PageComponents/Slug/AllSearchResults/AllSearchResults'
import BusinessType from '../../components/PageComponents/Slug/BusinessType/BusinessType'
import OrderDetail from '../../components/PageComponents/Slug/OrderDetail/OrderDetail'
import Service from '../../components/PageComponents/Slug/Service/Service'
import VendorAllProducts from '../../components/PageComponents/Slug/VendorAllProducts/VendorAllProducts'
import UserTrackOrder from '../../components/PageComponents/Slug/UserTrackOrder/UserTrackOrder'
import CompleteProfile from '../../components/PageComponents/Slug/CompleteProfile/CompleteProfile'
import VirtualExpoDetail from '../../components/PageComponents/Slug/VirtualExpoDetail/VirtualExpoDetail'
import VirtualExpoVideo from '../../components/PageComponents/Slug/VirtualExpoVideo/VirtualExpoVideo'
import BlogDetail from '../../components/PageComponents/Slug/BlogDetail/BlogDetail'
import Blog from '../../components/PageComponents/Blogs/Blogs'
import CoursesDetail from '../../components/PageComponents/Slug/CoursesDetail/CoursesDetail'
import VendorVideoDetail from '../../components/PageComponents/VendorVideoDetail/VendorVideoDetail'
import JobDetail from '../../components/PageComponents/Slug/JobDetail/JobDetail'
import CourseChapter from '../../components/PageComponents/Slug/CourseChapter/CourseChapter'
import VendorAllCourses from '../../components/PageComponents/Slug/VendorAllCourses/VendorAllCourses'
import VendorAllVideos from '../../components/PageComponents/Slug/VendorAllVideos/VendorAllVideos'

const MemoizedMetaTags = memo(MetaTags)
const MemoizedBreadCrumb = memo(BreadCrumb)

const MemoizedCategoryListing = memo(CategoryListing)
const MemoizedProduct = memo(Product)
const MemoizedProductListing = memo(ProductListing)
const MemoizedVendor = memo(Vendor)
const MemoizedServiceProviderDetail = memo(ServiceProviderDetail)
const MemoizedAllSearchResults = memo(AllSearchResults)
const MemoizedBusinessType = memo(BusinessType)
const MemoizedOrderDetail = memo(OrderDetail)
const MemoizedService = memo(Service)
const MemoizedVendorAllProducts = memo(VendorAllProducts)
const MemoizedUserTrackOrder = memo(UserTrackOrder)
const MemoizedCompleteProfile = memo(CompleteProfile)
const MemoizedVirtualExpoDetail = memo(VirtualExpoDetail)
const MemoizedVirtualExpoVideo = memo(VirtualExpoVideo)
const MemoizedBlogDetail = memo(BlogDetail)
const MemoizedBlog = memo(Blog)
const MemoizedCoursesDetail = memo(CoursesDetail)
const MemoizedVendorVideoDetail = memo(VendorVideoDetail)
const MemoizedJobDetail = memo(JobDetail)
const MemoizedCourseChapter = memo(CourseChapter)
const MemoizedVendorAllCourses = memo(VendorAllCourses)
const MemoizedVendorAllVideos = memo(VendorAllVideos)

const generateSchema = (pageType, result, router) => {
	if (!pageType) return null;

	const baseSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage'
	};

	switch (pageType) {
		case 'Business_types':
			return {
				...baseSchema,
				'@type': 'CollectionPage',
				id: `https://www.dvmcentral.com${router?.asPath}/#Category`,
				name: result?.breadcrumbs[0]?.name,
				url: `https://www.dvmcentral.com${router?.asPath}`,
				description: result?.meta_keywords,
				keywords: result?.meta_keywords,
				mainEntity: {
					'@type': 'BreadcrumbList',
					itemListElement: result?.main_categories?.data?.map((category, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						id: `https://www.dvmcentral.com/${category.slug}/#Category`,
						url: `https://www.dvmcentral.com/${category.slug}`,
						name: category.name,
						description: category.meta_description,
						item: `https://www.dvmcentral.com/${category.slug}`
					}))
				}
			};
	
		case 'Shop_Categories':
			return {
				...baseSchema,
				'@context': 'https://schema.org',
				'@graph': [
					{
						'@type': 'WebSite',
						'@id': 'https://www.dvmcentral.com/#website',
						url: 'https://www.dvmcentral.com',
						name: 'DVMCentral',
						description: 'Join DVM Central - A multi-vendor veterinary marketplace.',
						image: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
						potentialAction: {
							'@type': 'SearchAction',
							target: {
								'@type': 'EntryPoint',
								urlTemplate: 'https://www.dvmcentral.com/all-search-results/search/{search_term_string}'
							},
							'query-input': 'required name=search_term_string'
						}
					},
					{
						'@type': 'ItemList',
						itemListElement: result?.categories?.map((data, index) => ({
							'@type': 'ListItem',
							position: index + 1,
							name: data.name,
							item: `https://www.dvmcentral.com/${data.slug}`
						}))
					}
				]
			};
	
		case 'Service_Provider':
		case 'Shop_Vendor':
		case 'webinar_details':
			return {
				...baseSchema,
				'@context': 'https://schema.org',
				'@graph': [
					{
						'@type': 'BreadcrumbList',
						itemListElement: [
							{
								'@type': 'ListItem',
								position: 1,
								name: 'DVM Central - A Veterinary Marketplace',
								item: 'https://www.dvmcentral.com'
							},
							...result?.breadcrumbs?.map((breadCrumbdata, index) => ({
								'@type': 'ListItem',
								position: index + 2,
								name: breadCrumbdata?.name,
								item: breadCrumbdata?.link ? `https://www.dvmcentral.com/${breadCrumbdata?.link}` : `https://www.dvmcentral.com${router?.asPath}`
							}))
						]
					}
				]
			};
	
		case 'Product_detail':
			return {
				...baseSchema,
				'@graph': [
					{
						'@type': 'BreadcrumbList',
						itemListElement: [
							{
								'@type': 'ListItem',
								position: 1,
								name: 'Home',
								item: 'https://www.dvmcentral.com'
							},
							...result?.breadcrumbs?.map((link, i) => ({
								'@type': 'ListItem',
								position: i + 2,
								name: link?.name,
								item: `https://www.dvmcentral.com/${link?.link}`
							})),
							{
								'@type': 'ListItem',
								position: result?.breadcrumbs?.length + 1,
								name: result?.product?.name,
								item: `https://www.dvmcentral.com${router?.asPath}`
							}
					]
				}
			]
			};
	
		default:
			return null;
	}
	
};

const SlugPage = ({ result }) => {
	const router = useRouter();

	if (result?.error === '404' || result?.message === 'Slug not Found') {
		return <PageNotFound />;
	}

	const renderContent = () => {
		const pageType = result?.page_type;
		const pageComponents = {
			'Business_types': <MemoizedBusinessType result={result} name={result?.breadcrumbs[0]?.name} />,
			'Shop_Categories': <MemoizedCategoryListing result={result} />,
			'Products_list': <MemoizedProductListing result={result} router={router} />,
			'Product_detail': <MemoizedProduct result={result} />,
			'Service_detail': <MemoizedService result={result} />,
			'Shop_Vendor': <MemoizedVendor result={result} />,
			'Service_Provider': <MemoizedServiceProviderDetail result={result} />,
			'All_Results': <MemoizedAllSearchResults result={result} />,
			'Vendor_All_Products': <MemoizedVendorAllProducts result={result} />,
			'User_Track_Order': <MemoizedUserTrackOrder result={result} />,
			'complete_your_profile': <MemoizedCompleteProfile result={result?.data} />,
			'webinar_details': <MemoizedVirtualExpoDetail result={result} />,
			'webinar_video': <MemoizedVirtualExpoVideo result={result} />,
			'blog_detail': <MemoizedBlogDetail data={result} />,
			'blog_listing': <MemoizedBlog type='listing' blogs={result} />,
			'vendor_all_courses': <MemoizedVendorAllCourses data={result?.data} name={result?.breadcrumbs?.[result?.breadcrumbs?.length - 1]?.name} />,
			'vendor_all_video_courses': <MemoizedVendorAllVideos data={result?.data} name={result?.breadcrumbs?.[result?.breadcrumbs?.length - 1]?.name} />,
			'vendor_content': <MemoizedCoursesDetail data={result?.data} breadcrumbs={result?.breadcrumbs} />,
			'course_chapter': <MemoizedCourseChapter data={result?.data} breadcrumbs={result?.breadcrumbs} />,
			'vendor_video': <MemoizedVendorVideoDetail result={result} />,
			'order-details': <MemoizedOrderDetail result={result} />,
			'job_detail': <MemoizedJobDetail data={result} />
		};

		return pageComponents[pageType] || <PageNotFound />;
	};

	const schema = generateSchema(result?.page_type, result, router);
	const schemaScript = schema ? (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	) : null;

	return (
		<>
			{result.page_type !== 'Products_list' && (
				<MemoizedMetaTags
					pageType={result?.page_type}
					title={result?.page_type === 'order-details' ? `Order Details - DVM Central` : result?.meta_title}
					description={
						result?.page_type === 'order-details'
							? `View comprehensive details of your order. Access information on items purchased, shipping status, payment details, and more, providing you with a complete overview of your transaction for a seamless shopping experience.`
							: result?.meta_description
					}
					keywords={result?.meta_keywords}
					ogWidth={1200}
					ogHeight={630}
					ogImg={
						result?.page_type === 'Business_types'
							? `${imgApiUrl.categories.large}/${result?.main_categories?.data[0]?.image}`
							: result.page_type === 'Shop_Categories'
							? `${imgApiUrl.categories.large}/${result?.categories[0]?.image}`
							: result.page_type === 'Products_list'
							? `${imgApiUrl.products.large}/${result?.products?.data[0]?.image}`
							: result?.page_type === 'Product_detail'
							? `${imgApiUrl?.products?.large}/${result?.product?.image}`
							: result?.page_type === 'Shop_Vendor'
							? `${imgApiUrl.vendor.logo}/${result?.vendor?.logo}`
							: result?.page_type === 'Service_Provider'
							? `${imgApiUrl.vendor.logo}/${result?.serviceProviderDetail?.logo}`
							: 'https://www.dvmcentral.com/og-logo.jpg'
					}
				>
					{schemaScript}
				</MemoizedMetaTags>
			)}

			<MemoizedBreadCrumb pageType={result?.page_type} breadcrumbsData={result?.breadcrumbs} />
			{renderContent()}
		</>
	);
};

export default memo(SlugPage);

export async function getServerSideProps(ctx) {
	const user = await getSession(ctx);
	const { slug } = ctx?.query;

	const cookies = ctx.req.headers.cookie ? require('cookie').parse(ctx.req.headers.cookie) : {};
	const impersonateUserId = cookies.impersonateUserId;

	const userId = impersonateUserId || user?.id || user?.user?.id;
	const headers = {
		type: ctx?.resolvedUrl?.includes('/virtual-expo/')
			? `dvm_central/${userId}`
			: ctx?.resolvedUrl?.includes('/blogs/')
			? 'dvm_central'
			: ctx?.resolvedUrl.lastIndexOf('/') > 0
			? userId
			: null,
		keyword: ctx?.resolvedUrl.lastIndexOf('/') === 0 ? userId : null
	};

	const data = await fetch(`${baseApiUrl}${ctx?.resolvedUrl}`, {
		method: 'GET',
		headers
	}).then((res) => res.json());

	if (data?.redirection) {
		return {
			redirect: {
				destination: data?.redirect_url,
				permanent: true
			}
		};
	}

	return {
		props: {
			key: slug,
			result: data
		}
	};
}
