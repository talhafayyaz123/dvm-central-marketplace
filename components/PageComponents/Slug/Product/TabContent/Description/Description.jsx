import React from 'react'
import styles from './Description.module.css'

const Description = ({ data, quickFacts }) => {
	const ingredients = quickFacts?.filter((fact) => fact?.type === 'Ingredient'),
		packageType = quickFacts?.filter((fact) => fact?.type === 'Package Type'),
		species = quickFacts?.filter((fact) => fact?.type === 'Species'),
		uses = quickFacts?.filter((fact) => fact?.type === 'Uses')

	return (
		<div className='description'>
			<div>
				{data !== null && <h5>Product Description</h5>}
				<div className={`${quickFacts?.length > 0 ? styles.wrapper : undefined}`}>
					{data !== null ? <div className={`${styles.desc} dynamic-data`} dangerouslySetInnerHTML={{ __html: data }} /> : quickFacts?.length === 0 && <div className='gray-color'>No description available.</div>}
					{quickFacts?.length > 0 && (ingredients?.length > 0 || packageType?.length > 0 || species?.length > 0 || uses?.length > 0) && (
						<div className={`${styles.facts} gray-border`}>
							<h5>Specifications</h5>
							{ingredients?.length > 0 && (
								<div className={styles.inner_wrapper}>
									<div>Ingredients</div>
									<div>
										{ingredients?.map((ing, i) => (
											<span key={ing?.id}>
												{ing?.name} {ingredients?.length > 0 && i < ingredients?.length - 1 ? ', ' : ''}
											</span>
										))}
									</div>
								</div>
							)}

							{packageType?.length > 0 && (
								<div className={styles.inner_wrapper}>
									<div>Package Type</div>
									<div>
										{packageType?.map((type, i) => (
											<span key={type?.id}>
												{type?.name} {packageType?.length > 0 && i < packageType?.length - 1 ? ', ' : ''}
											</span>
										))}
									</div>
								</div>
							)}

							{species?.length > 0 && (
								<div className={styles.inner_wrapper}>
									<div>Species</div>
									<div>
										{species?.map((species, i) => (
											<span key={species?.id}>
												{species?.name} {species?.length > 0 && i < species?.length - 1 ? ', ' : ''}
											</span>
										))}
									</div>
								</div>
							)}

							{uses?.length > 0 && (
								<div className={styles.inner_wrapper}>
									<div>Uses</div>
									<div>
										{uses?.map((uses, i) => (
											<span key={uses?.id}>
												{uses?.name} {uses?.length > 0 && i < uses?.length - 1 ? ', ' : ''}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Description
