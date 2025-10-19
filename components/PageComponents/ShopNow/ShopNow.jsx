import React, { useState } from 'react'
import styles from './ShopNow.module.css'
import CategoryCard from '../../UI/CategoryCard/CategoryCard'
import MetaTags from '../../UI/MetaTags/MetaTags'
import Link from 'next/link'

const ShopNow = ({ data }) => {
	const [showMoreInfo, setshowMoreInfo] = useState(false)
	return (
		<>
			<MetaTags
				title={`Buy Veterinary Supplies & Products Online - DVM Central Store`}
				description={`Buy top veterinary supplies and products online at DVM Central. Your trusted veterinary supplies store for all pet care needs. Shop now for the best deals!`}
				keywords={`Online vet products, Pet medications online, Online animal health products, Veterinary drugs online, Pet supplies online store, Online veterinary equipment`}
			>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(
							// 	{
							// 	'@context': 'https://schema.org',
							// 	'@type': 'BreadcrumbList',
							// 	itemListElement: [
							// 		{
							// 			'@type': 'ListItem',
							// 			position: 1,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/surgical-instruments/small-animal-surgical-instruments',
							// 				url: 'https://www.dvmcentral.com/surgical-instruments/small-animal-surgical-instruments',
							// 				name: 'Small Animal Surgical Instruments',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fsmall-animal-surgical-instruments-1646747598.jpg&w=256&q=75',
							// 				description:
							// 					'Discover our comprehensive selection of Small Animal Surgical Instruments, meticulously designed to cater to the needs of veterinary professionals. Our range encompasses Surgical Scissors, Needle Holders, Ophthalmic & Neurosurgical Instruments, Spay/Neuter Packs, Gallbladder Instruments, Nasal Instruments, Surgery Packs, and a host of essential tools for veterinary surgeries in the operating room. Crafted from premium German medical-grade stainless steel, our Small Animal Surgical Instruments are renowned for their exceptional durability and reliability, ensuring peak performance for veterinarians. Buy Direct, Save More.'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 2,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/surgical-instruments/small-animal-dental-instruments',
							// 				url: 'https://www.dvmcentral.com/surgical-instruments/small-animal-dental-instruments',
							// 				name: 'Small Animal Dental Instruments',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fsmall-animal-dental-instruments-1646747777.jpg&w=256&q=75',
							// 				description:
							// 					'Discover top-tier small animal dental instruments at DVM Central, your ultimate source for veterinary dental excellence. Our veterinary dental instrument collection is meticulously curated to empower veterinary professionals with precision, efficiency, and exceptional results. Choose from essential vet dental instruments and specialized tools such as Dental Burnishers, Dental Bone Files, Periotomes, Probes, Scalers and much more.  Our comprehensive range covers all your dental needs. Explore our veterinary dental tools names and elevate your practice to new heights in veterinary dentistry with DVM Central. Unleash the power of precise dental care for small animals – choose us for unmatched quality and performance.'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 3,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/surgical-instruments/large-animal-surgical-instruments',
							// 				url: 'https://www.dvmcentral.com/surgical-instruments/large-animal-surgical-instruments',
							// 				name: 'Large Animal Surgical Instruments',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Flarge-animal-surgical-instruments-1646754677.jpg&w=256&q=75',
							// 				description:
							// 					'Explore a comprehensive range of Large Animal Surgical Instruments at DVM Central! Elevate your practice with our top-tier Abdominal Instruments, ensuring precision in every procedure.  The anesthesia instruments featured here are designed for safe and effective sedation. Moreover, the diagnostic and restraint instruments foster accurate diagnoses, while the biopsy instruments facilitate precise tissue sampling. Additionally, the Equine Special Instruments cater to specific needs in equine care. You can also find a range of Obstetrical Instruments to help navigate obstetrical challenges seamlessly. Explore excellence at DVM Central, where quality meets innovation and equip your clinic with cutting-edge Large Animal Instruments.'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 4,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/surgical-instruments/orthopedic-surgical-instruments',
							// 				url: 'https://www.dvmcentral.com/surgical-instruments/orthopedic-surgical-instruments',
							// 				name: 'Orthopedic Surgical Instruments',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Forthopedic-surgical-instruments-1646754802.jpg&w=256&q=75',
							// 				description:
							// 					"Orthopedic surgical instruments are indispensable tools for each veterinary orthopedic specialist. From bone chisels to surgical mallets and wire and pin cutters, DVM Central features a diverse selection of animal orthopedic instruments tailored to the unique needs of veterinarians. Our primary aim is to make available high-quality surgical tools meticulously designed for precision, durability, and ease of use. Whether you're conducting joint surgeries, fracture repairs, or other orthopedic procedures, orthopedic instruments featured at DVM Central will assist you in delivering the best care to your animal patients."
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 5,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/supplies/anesthesia-supplies',
							// 				url: 'https://www.dvmcentral.com/supplies/anesthesia-supplies',
							// 				name: 'Anesthesia Supplies',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fanesthesia-supplies-1646754939.jpg&w=256&q=75',
							// 				description:
							// 					'Anesthesia instruments are an essential part of veterinary surgeries. These are required to sedate and prevent animals from feeling pain and discomfort by administering sedating agents during surgeries. You can choose from a comprehensive list of products that include Bellows and Housing, Scavenger Interfaces, Absorbents, Dressings, Induction Chambers, and much more. All of these products are supplied by first-rate manufacturers and are made from top-quality materials to guarantee exceptional performance during veterinary procedures. Explore our comprehensive Anesthesia offerings to level up your practice today!'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 6,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/supplies/diagnostic-instruments',
							// 				url: 'https://www.dvmcentral.com/supplies/diagnostic-instruments',
							// 				name: 'Diagnostic Instruments',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fdiagnostic-instruments-1646755200.jpg&w=256&q=75',
							// 				description:
							// 					'We offer an extensive range of Diagnostic Instruments in several styles and variations to best suit your veterinary needs. These include Otoscopes, Tonoscopes, Anoscopes, Diagnostic Lights, and much more! These medical products are crafted for durability and reliability in veterinary operating rooms and to provide the highest degree of medical care to our animal companions. Choosing the best Diagnostic Supplies for your veterinary practice or business has never been easier! Buy Direct, Save More. '
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 7,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/veterinary-equipment/x-ray-imaging',
							// 				url: 'https://www.dvmcentral.com/veterinary-equipment/x-ray-imaging',
							// 				name: 'X-Ray Imaging',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fx-ray-imaging-1646755911.jpg&w=256&q=75',
							// 				description:
							// 					"DVM Central is your trusted source for state-of-the-art veterinary X-ray imaging equipment. X-ray imaging is a staple of medical diagnostics and is used to view the internals of the body. Our advanced technology ensures the precise and accurate diagnostics essential for the well-being of your beloved pets. With a commitment to quality, we offer a range of top-quality X-ray devices that include both stationary and mobile x-ray systems as well as devices for dentistry. At DVM Central, your pet's health is our top priority. Find all the tools you need in one place. Buy Direct, Save More."
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 8,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/veterinary-equipment/veterinary-tables',
							// 				url: 'https://www.dvmcentral.com/veterinary-equipment/veterinary-tables',
							// 				name: 'Veterinary Tables',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fveterinary-tables-1646756485.jpg&w=256&q=75',
							// 				description:
							// 					"DVM Central takes pride in offering a diverse selection of veterinary tables designed to create a comfortable and secure environment for pet examinations and procedures. We understand the significance of your pet's well-being, and our extensive variety of tables cater to a broad range of needs. Our range of tables includes C-Arm, Equine, Lift, Wet, and Necropsy tables. These further include different models and varieties so that your veterinary requirements are completely fulfilled. Choose DVM Central for quality equipment that ensures the utmost care for your animal companions. Your pets deserve nothing but the best. "
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 9,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/veterinary-equipment/veterinary-dental-units-and-accessories',
							// 				url: 'https://www.dvmcentral.com/veterinary-equipment/veterinary-dental-units-and-accessories',
							// 				name: 'Veterinary Dental Units and Accessories',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fveterinary-dental-units-and-accessories-1646756746.jpg&w=256&q=75',
							// 				description:
							// 					"At DVM Central, we offer a comprehensive range of high-quality veterinary dental tools and accessories. We are dedicated to ensuring the precise oral care of your pets, making their dental health a top priority. Our selection of dental tools meets the highest standards of dental care, allowing you to enhance the health and happiness of your beloved animals. Trust in DVM Central for the tools you need to provide the best care for your pets' oral health. Buy Direct, Save More. "
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 10,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/veterinary-medicines/diabetes-medications-for-dogs-and-cats',
							// 				url: 'https://www.dvmcentral.com/veterinary-medicines/diabetes-medications-for-dogs-and-cats',
							// 				name: 'Diabetes Medications for Dogs and Cats',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fdiabetes-medications-for-dogs-and-cats-1694538919.jpg&w=256&q=75',
							// 				description:
							// 					'Like humans, cats and dogs can also contract diabetes at any age. This means that effective management of diabetes in pets is paramount, and DVM Central understands that. Our catalog includes reliable dog diabetic supplies and cat diabetic pills tailored to ensure the well-being of your furry friends. You can trust us for top-quality medications that provide the best care for diabetic dogs and cats. When it comes to managing diabetes in your pets, rely on DVM Central for the most reliable solutions.'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 11,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/supplies/diet-and-food',
							// 				url: 'https://www.dvmcentral.com/supplies/diet-and-food',
							// 				name: 'Diet and Food',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fdiet-and-food-1646755540.jpg&w=256&q=75',
							// 				description:
							// 					'We offer an extensive range of Veterinary Diets and Nutrition for a variety of species, breeds, and sub-types of animals. These Diets and Feeds come from the highest quality manufacturers and sources so they can keep animals both healthy and also provide them with the highest quality of nutrition. Explore top-quality animal nutrition options at DVM Central, the Internet’s Premier Veterinary Marketplace. Choosing quality nutrition for your pet, veterinary practice or business has never been this simple! Buy directly at DVM Central for more savings. '
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 12,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/supplies/pet-vet-grooming',
							// 				url: 'https://www.dvmcentral.com/supplies/pet-vet-grooming',
							// 				name: 'Pet / Vet Grooming',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fpet-vet-grooming-1644349978.jpg&w=256&q=75',
							// 				description:
							// 					"We offer an extensive range of Pet and Veterinary Grooming Products for a variety of species, breeds, and sub-types of animals. These products are manufactured from the highest-grade materials to ensure that your furry companions look their best and also receive the highest degree of medical care. Explore top-quality pet beautification options at DVM Central, the Internet’s Premier Veterinary Marketplace. Purchasing the most dependable grooming products for your pet, veterinary practice or business couldn't be simpler! Buy directly to save more with us.  "
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 13,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/surgical-instruments/tplo-instruments-tibial-plateau-leveling-osteotomy',
							// 				url: 'https://www.dvmcentral.com/surgical-instruments/tplo-instruments-tibial-plateau-leveling-osteotomy',
							// 				name: 'TPLO Instruments (Tibial Plateau Leveling Osteotomy)',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Ftplo-instruments-tibial-plateau-leveling-osteotomy-1673608929.jpg&w=256&q=75',
							// 				description:
							// 					'We offer an extensive range of TPLO (Tibial Plateau Leveling Osteotomy) Instruments in several designs and variations to best suit veterinary surgeons’ needs. The special products include drills, screws, and plates for small animals joint surgery. These surgical instruments are crafted from medical-grade German stainless steel to ensure durability and reliability in veterinary operating rooms in order to provide the highest degree of care to your patients. DVM Central only features reliable and high-quality products from authorized and trustworthy manufacturers. '
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 14,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/equine-surgical-instruments',
							// 				url: 'https://www.dvmcentral.com/equine-surgical-instruments',
							// 				name: 'Equine Surgical Instruments',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fequine-surgical-instruments-1674029114.jpg&w=256&q=75',
							// 				description:
							// 					'Browse through the most extensive range of Equine Surgical Instruments on DVM Central. Choose from Equine Surgical Instrument Sets such as Dental Kits, Emasculators/Castrators, Hoof Care Equipment, Surgical Kits, and much more that can be used for both horses and other large animal surgeries and treatments. Top manufacturers and suppliers have showcased large animal instruments, and these are made from premium-quality materials. making them high-tensile and reliable for veterinary medical care. Choosing the best Equine Equipment for your pet or veterinary practice has never been easier!'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 15,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/left-handed-veterinary-surgical-instrumentshttps://www.dvmcentral.com/left-handed-veterinary-surgical-instruments',
							// 				url: 'https://www.dvmcentral.com/left-handed-veterinary-surgical-instruments',
							// 				name: 'Left Handed Veterinary Surgical Instruments',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fleft-handed-veterinary-surgical-instruments-1674135672.jpg&w=256&q=75',
							// 				description:
							// 					"Discover top-quality left-handed veterinary surgical instruments at DVM Central. Designed for left-handed veterinarians, our medical-grade tools provide precision and comfort during surgeries for left-dominant surgeons and vets. Choose from specialized tools for left-handers like dissecting scissors, hemostatic forceps, needle holders, and more. We provide left-handed tools that are made by leading producers to allow you to carry out veterinary procedures comfortably in whatever your preferred hand is. Select from the most reliable left-handed tools for your veterinary practice with DVM Central's extensive offerings!"
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 16,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/quick-lock-cerclage-band',
							// 				url: 'https://www.dvmcentral.com/quick-lock-cerclage-band',
							// 				name: 'Quick Lock Cerclage Band',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fquick-lock-cerclage-band-1674632349.jpg&w=256&q=75',
							// 				description:
							// 					'Browse through an extensive range of Cerclage Quicklock Bands. They are flexible and versatile instruments available in different sizes to accommodate various surgical scenarios and are best used in the repair of long or spiral fractures of long bones. All of our Cerclage Quicklock Bands are supplied by reliable makers of veterinary products and made from only the best materials to fulfill the demands of your practice or business. Choosing Cerclage Quicklock Bands for your veterinary practice is very simple on our platform!'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 17,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/tta-instruments-tibial-tuberosity-advancement',
							// 				url: 'https://www.dvmcentral.com/tta-instruments-tibial-tuberosity-advancement',
							// 				name: 'TTA Instruments (Tibial Tuberosity Advancement)',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Ftta-instruments-tibial-tuberosity-advancement-1678447821.jpg&w=256&q=75',
							// 				description:
							// 					'Choosing TTA Instruments for your veterinary practice may have been challenging! Explore our precision veterinary TTA instruments specially designed for Tibial Tuberosity Advancement Surgery in dogs. When it comes to canine knee procedures, we offer a range of TTA equipment, including TTA Rapid Depth Gauges, TTA Forceps, TTA Screwdriver Inserts, TTA Universal Spreaders, and associated accessories. All products featured at DVM Central are reliable and specially designed to better meet the requirements of veterinary professionals. Explore our TTA equipment and improve your procedures on your canine patients.'
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 18,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/medication-for-cats',
							// 				url: 'https://www.dvmcentral.com/medication-for-cats',
							// 				name: 'Medication for Cats',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fmedication-for-cats-1694539078.webp&w=256&q=75',
							// 				description:
							// 					'Find the best medication for cat complications at DVM Central! Choose from a wide range of medicinal treatments for cats, including medication for allergies, anxiety, pain, and ear infections, as well as antibiotics and much more. DMV Central sources medication for cats from top manufacturers of pet health supplies to ensure the highest quality of veterinary care. Explore the diverse catalog and meet all your needs for feline medicine. DVM Central is your one-stop shop for animal health supply needs. Find the quality products you need to ensure good health for your pets. '
							// 			}
							// 		},

							// 		{
							// 			'@type': 'ListItem',
							// 			position: 19,
							// 			item: {
							// 				'@id': 'https://www.dvmcentral.com/medication-for-dogs',
							// 				url: 'https://www.dvmcentral.com/medication-for-dogs',
							// 				name: 'Medication for Dogs',
							// 				image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fcategories%2Fthumbnails%2Fmedication-for-dogs-1694539163.jpg&w=256&q=75',
							// 				description:
							// 					'Browse from a vast range of medicinal treatments for dogs including medication for dog allergies, anxiety, pain, ear infections, and more. Find the best medicine for all dog ailments and provide relief for your canine companion with our selection of treatments. All of our dog meds are provided by top manufacturers and made using the most optimal pharmaceutical processes to make sure that your pets or clients receive the highest standard of veterinary medical care. Going with the most effective dog medication for your pet or veterinary practice is as simple as it comes!'
							// 			}
							// 		}
							// 	]
							// }
							{
								'@context': 'http://schema.org',
								'@type': 'BreadcrumbList',
								itemListElement: [
									{
										'@type': 'ListItem',
										position: 1,
										name: 'Home Page',
										item: 'https://www.dvmcentral.com/'
									},
									{
										'@type': 'ListItem',
										position: 2,
										name: 'Shop Now',
										item: 'https://www.dvmcentral.com/shop-now'
									}
								]
							}
						)
					}}
				/>

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebPage',
							headline: 'Shop Reliable Online Veterinary Supplies at DVM Central',
							image: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
							author: {
								'@type': 'Organization',
								name: 'DVM Central'
							},
							publisher: {
								'@type': 'Organization',
								name: 'DVM Central',
								logo: {
									'@type': 'ImageObject',
									url: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg'
								}
							},
							datePublished: '2024-10-08',
							dateModified: '2024-11-05'
						})
					}}
				/>
			</MetaTags>

			<section className='sec-m'>
				<div className='sec-container'>
					<h4>Shop by Categories</h4>
					<div className={`${styles.wrapper} inner-sec-mt`}>
						{data?.map((data, index) => {
							return <CategoryCard pageType='shop-now' key={data?.id} data={data} index={index} />
						})}
					</div>
				</div>
			</section>

			{/* // showNow text */}
			<section className='sec-container dynamic-data'>
				<div className={`${styles.content} sec-pb`}>
					<h1>Shop Reliable Online Veterinary Supplies at DVM Central</h1>
					<p>
						It’s always hectic for busy-schedule professionals to buy{' '}
						<span>
							<Link href='/'>
								<a className='link'>veterinary products</a>
							</Link>
						</span>{' '}
						from different shops and stores. This takes a lot of time while searching for different products in multiple locations.
					</p>
					<p>At DVM Central, we offer a comprehensive range of veterinary supplies to meet the diverse needs of your practice. Whether you manage a clinic, hospital, or mobile service, our marketplace ensures you have access to the latest innovations in online veterinary products.</p>
					<h2>Buy Online Vet Supplies for Your Practice</h2>
					<p>Our simple, intuitive interface makes purchasing veterinary supplies online quick and easy. This allows you to focus more on what matters—providing exceptional care to your patients.</p>
					<p>Just browse what you need and follow the simple steps to get your desired products.{!showMoreInfo ? '...' : ''}</p>

					{!showMoreInfo && (
						<div>
							<button className={`${styles.read_more} primary-btn white-color`} onClick={() => setshowMoreInfo(true)}>
								Read More
							</button>
						</div>
					)}
					{showMoreInfo && (
						<>
							<h2>Browse and Choose from the Extensive Veterinary Supplies Catalog</h2>
							<p>
								Our <strong>veterinary catalog</strong> covers everything needed to keep your practice running smoothly.
							</p>
							<p>You can browse by category, making it effortless to find essential items.</p>
							<p>Our catalog includes:</p>
							<ul>
								<li>Surgical instruments for precise procedures.</li>
								<li>Dentistry instruments for maintaining oral health.</li>
								<li>Orthopedic supplies to treat musculoskeletal issues.</li>
								<li>Diagnostics and laboratory tools for accurate assessments.</li>
								<li>Wound care, autoclaves, and instrument cleaners.</li>
								<li>And many more.</li>
							</ul>
							<p>We offer a complete package, so no matter what your practice specializes in, our extensive online veterinary supply store provides the tools and products you need to ensure the highest standards in DVM veterinary care.</p>
							<h2>Shop for Your Online Vet Care Needs</h2>
							<p>DVM Central is dedicated to enhancing online vet care by offering a full range of supplies for small animal, equine, and large animal practices. </p>
							<p>Our platform ensures that all your veterinary supply needs are met, from critical care and recovery tools to vaccines and parasiticides. You’ll find everything you need to support comprehensive animal care veterinary services.</p>
							<div>
								<p>Our DVM offerings include:</p>
							</div>
							<ul>
								<li>Animal handling and restraint devices</li>
								<li>Breeding and obstetrics products</li>
								<li>Recovery equipment and surgical tools</li>
								<li>Essential vaccines and preventive care supplies</li>
							</ul>
							<p>With DVM Central, finding shopping for the right veterinary supplies online is simple and efficient, enabling you to keep your practice fully stocked.</p>
							<h2>Equip Your Practice with the Best</h2>
							<p>At DVM Central, we provide all the tools and equipment necessary to maintain a well-functioning clinic. </p>
							<p>Key products include:</p>
							<ul>
								<li>X-ray and imaging technology</li>
								<li>Physical therapy and rehabilitation tools</li>
								<li>Facility supplies like lighting, apparel, and bedding</li>
								<li>Cages, tables, tubs, and mats</li>
							</ul>
							<p>Shop now for a wide selection of online veterinary supplies and enjoy the convenience of your trusted veterinary supply store. </p>
						</>
					)}
				</div>
			</section>
		</>
	)
}

export default ShopNow
