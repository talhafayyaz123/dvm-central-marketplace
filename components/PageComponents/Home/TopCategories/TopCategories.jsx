import React from 'react'
import styles from './TopCategories.module.css'
import { imgApiUrl } from '../../../../utils/config'
import CategoryCard from '../../../UI/CategoryCard/CategoryCard'
import Link from 'next/link'

const TopCategories = ({ topCategories }) => {
	return (
		<section className='top_categories_container sec-mt'>
			<div className='top_categories_wrapper sec-container'>
				<div className='heading_wrapper'>
					<h4 className='primary-color'>Marketplace Veterinary</h4>
					<h2>Explore Categories, Shop Now!</h2>
					<p className='gray-color'>Start shopping right away by exploring our extensive product categories featuring excellent quality animal health products from potential suppliers.</p>
				</div>

				<div className={`${styles.top_categoreis_inner_wrapper} inner-sec-mt`}>
					{topCategories.slice(0, 4).map((data) => {
						return <CategoryCard pageType='home' key={data.id} data={data} />
					})}
				</div>
				{/* <div className={styles.btn_wrapper}>
          <Link href="/">
            <a className="btn-mt">
              <button className="primary-btn">
                <span>Shop Now</span>

                <svg xmlns="http://www.w3.org/2000/svg" width="19.625" height="18.092" viewBox="0 0 19.625 18.092">
                  <path id="Arrow" d="M10.444,18.092,8.285,15.975l7.026-6.924L8.285,2.128,10.446,0l9.18,9.046-9.18,9.046Zm-8.285,0h0L0,15.975,7.026,9.051,0,2.128,2.159,0l9.181,9.046L2.159,18.092Z" fill="#fff" />
                </svg>
              </button>
            </a>
          </Link>
        </div> */}
			</div>
		</section>
	)
}

export default TopCategories
