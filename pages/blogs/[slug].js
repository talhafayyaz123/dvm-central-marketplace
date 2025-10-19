import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { baseApiUrl } from '../../utils/config'
import BreadCrumb from '../../components/UI/BreadCrumb/BreadCrumb'
import MetaTags from '../../components/UI/MetaTags/MetaTags'
import PageNotFound from '../../components/PageComponents/PageNotFound/PageNotFound'
import BlogDetail from '../../components/PageComponents/Slug/BlogDetail/BlogDetail'
import Blog from '../../components/PageComponents/Blogs/Blogs'


const MemoizedMetaTags = memo(MetaTags)
const MemoizedBreadCrumb = memo(BreadCrumb)
const MemoizedBlogDetail = memo(BlogDetail)
const MemoizedBlog = memo(Blog)


const generateSchema = (pageType, result, router) => {
    if (!pageType) return null;

    const baseSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage'
    };

    switch (pageType) {
        case 'blog_detail':
        case 'blog_listing':
            return {
                ...baseSchema,
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
            'blog_detail': <MemoizedBlogDetail data={result} />,
            'blog_listing': <MemoizedBlog type='listing' blogs={result} />
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
            <MemoizedMetaTags
                pageType={result?.page_type}
                title={result?.meta_title}
                description={result?.meta_description}
                keywords={result?.meta_keywords}
                ogWidth={1200}
                ogHeight={630}
                ogImg={'https://www.dvmcentral.com/og-logo.jpg'}
            >
                {schemaScript}
            </MemoizedMetaTags>

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
        type: ctx?.resolvedUrl?.includes('/blogs/') ? 'dvm_central' : null,
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