import React, { useEffect } from 'react'
import HotSellingProducts from './HotSellingProducts/HotSellingProducts'
import Topbar from './Topbar/Topbar'
import AllProducts from './AllProducts/AllProducts'
import ImgWithLoader from '../../../../../UI/ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../../../../utils/config'
import styles from './RightColContent.module.css'

const RightColContent = ({
	vendorId,
	pageList,
	hotProduts,
	searchResultAllProducts,
	setsearchResultAllProducts,
	displayType,
	setdisplayType,
	showSearchFilterResult,
	setshowSearchFilterResult,
	showSubPage,
	setshowSubPage,
	activeSubPageIndex,
	setactiveSubPageIndex,
	vendorSlug,
	setmodal,
	setModalData,
	allProducts,
	allProductsPage,
	setmodalLoading,
	loginUser
}) => {
	useEffect(() => {
		const links = document.querySelectorAll('.dynamic-data a')
		links?.length > 0 && links.forEach((link) => (!link.querySelector('img') && link.classList.add('link'), link.setAttribute('target', '_blank')))
	}, [showSubPage])
	return (
		<>
			<Topbar
				vendorId={vendorId}
				displayType={displayType}
				setdisplayType={setdisplayType}
				setshowSearchFilterResult={setshowSearchFilterResult}
				setsearchResultAllProducts={setsearchResultAllProducts}
				pageList={pageList}
				showSubPage={showSubPage}
				setshowSubPage={setshowSubPage}
				activeSubPageIndex={activeSubPageIndex}
				setactiveSubPageIndex={setactiveSubPageIndex}
				searchResultAllProducts={searchResultAllProducts}
				loginUser={loginUser}
			/>

			{displayType === 'products' ? (
				hotProduts?.length > 0 || showSearchFilterResult ? (
					<HotSellingProducts hotProduts={hotProduts} showSearchFilterResult={showSearchFilterResult} searchResultAllProducts={searchResultAllProducts} vendorSlug={vendorSlug} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
				) : (
					<AllProducts noHotproducts={true} allProducts={allProducts} vendorSlug={vendorSlug} allProductsPage={allProductsPage} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
				)
			) : (
				<div className='inner-sec-mt  sec-mb'>
					<h5>{pageList[activeSubPageIndex]?.name}</h5>
					<div className='dynamic-data' dangerouslySetInnerHTML={{ __html: pageList[activeSubPageIndex]?.content }} />
					{pageList[activeSubPageIndex]?.name === 'Catalogs' && pageList[activeSubPageIndex]?.catalogs?.length > 0 && (
						<div className={styles.catalog_wrapper}>
							{pageList[activeSubPageIndex]?.catalogs?.map((catalog) => {
								const { id, name, image, pdf_file } = catalog
								return (
									<a className={styles.catalog} href={`${imgApiUrl.flyers.flyers}/${pdf_file}`} target='_blank' rel='noreferrer' download key={id}>
										<ImgWithLoader className={`${styles.catalog_img} transition radius`} width={224} height={290} src={`${imgApiUrl.flyers.image}/${image}`} alt={name} />
										<div className={styles.name}>{name}</div>
									</a>
								)
							})}
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default RightColContent
