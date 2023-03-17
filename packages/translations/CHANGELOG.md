# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.4](https://github.com/bothrs/open-source/compare/@bothrs/translations@1.1.3...@bothrs/translations@1.1.4) (2023-03-17)

**Note:** Version bump only for package @bothrs/translations





## [1.1.3](https://github.com/bothrs/open-source/compare/@bothrs/translations@1.1.2...@bothrs/translations@1.1.3) (2022-11-23)


### Bug Fixes

* added yarn workspaces again ([3c78cb9](https://github.com/bothrs/open-source/commit/3c78cb92254d20dbc231336cc7afe54300c1efb5))
* use proper variable name ([789f76e](https://github.com/bothrs/open-source/commit/789f76eb0ad06b828d79ec515d502166263dea93))
* wrap logic in useEffect to actually load the translations ([dd2d426](https://github.com/bothrs/open-source/commit/dd2d42612d60e518b65584a79a41684a563f90c5))





## [1.1.2](https://github.com/bothrs/open-source/compare/@bothrs/translations@1.1.1...@bothrs/translations@1.1.2) (2022-06-22)


### Bug Fixes

* Add translation support for healthblocks v2 ([d6e3e29](https://github.com/bothrs/open-source/commit/d6e3e290f67b46c617f89af5b841b0bb824d86a5))





## [1.1.1](https://github.com/bothrs/open-source/compare/@bothrs/translations@1.1.0...@bothrs/translations@1.1.1) (2022-06-07)


### Bug Fixes

* **CI:** Consistent typescript version ([00b56c3](https://github.com/bothrs/open-source/commit/00b56c3eb5b7fb71738f577931df02268e4340e2))





# [1.1.0](https://github.com/bothrs/open-source/compare/@bothrs/translations@1.0.1...@bothrs/translations@1.1.0) (2022-04-13)


### Bug Fixes

* add fix on load translations ([159fc51](https://github.com/bothrs/open-source/commit/159fc51596acf0221e6876d7bb6dece5a5e643db))
* prevent multiple inits ([f136d60](https://github.com/bothrs/open-source/commit/f136d60c585c3bd050a2b138e8aeedffebb449e1))
* refactor without useEffect ([2715111](https://github.com/bothrs/open-source/commit/2715111483f8539b28eee24356e817cc490556c7))


### Features

* add yalc setup ([bc3b69b](https://github.com/bothrs/open-source/commit/bc3b69ba9f17770fbfcf5ad5c44f1e8172b4e611))
* remove init listener ([21e0520](https://github.com/bothrs/open-source/commit/21e052052470127e6d059d8a252623ad0dc28c97))
* use the init callback ([51bd8ed](https://github.com/bothrs/open-source/commit/51bd8ed4ce7467dce9bed7fe9271d4c191693175))





## [1.0.1](https://github.com/bothrs/open-source/compare/@bothrs/translations@1.0.0-rc.5...@bothrs/translations@1.0.1) (2022-03-14)

**Note:** Version bump only for package @bothrs/translations





# [1.0.0-rc.5](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.3.0...@bothrs/translations@1.0.0-rc.5) (2022-03-14)


### Bug Fixes

* run build before publish ([80878db](https://github.com/bothrs/open-source/commit/80878dbc536d3dd21639e7ff31507957fee0c22a))
* use tsc for building @bothrs/translations ([40ad9ab](https://github.com/bothrs/open-source/commit/40ad9abd0c6bfca081b26705462786299abbc9fb))


### Features

* refactor useTranslations to be more generic and add Web support ([7975576](https://github.com/bothrs/open-source/commit/7975576a9270a876e881f6e741f59177d292ebd4))
* update docs and examples ([d7abe20](https://github.com/bothrs/open-source/commit/d7abe202507970147c2d032c1e3df6692adcb018))


### BREAKING CHANGES

* Rename `useTranslations` to `useAirtableTranslations`
* Remove `useStartupLanguage` (use `lng` instead)
* Remove `dataFormatter` (use `fetchOptions.parse` instead)
feat: Add `useHealthblocksTranslations`





# [0.3.0](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.2.1...@bothrs/translations@0.3.0) (2022-01-04)


### Bug Fixes

* remove tarball file ([f218bf2](https://github.com/bothrs/open-source/commit/f218bf24c136638607a9afa669de6022f0b2830a))
* use i18next-async-storage-backend2 to remove async-storage warning ([787fbd1](https://github.com/bothrs/open-source/commit/787fbd19e1baa86cc82edac5c571087615433de3))


### Features

* add tarball of 0.2.1 ([93ac255](https://github.com/bothrs/open-source/commit/93ac2551fe1439ca155974fb47f82fde227d0402))





## [0.2.1](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.2.0...@bothrs/translations@0.2.1) (2021-11-30)

**Note:** Version bump only for package @bothrs/translations





# [0.2.0](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.7...@bothrs/translations@0.2.0) (2021-11-10)


### Features

* **Translations:** allow to format the fetched data ([1b11c07](https://github.com/bothrs/open-source/commit/1b11c077f7e12c6525606a8aa31b07dbe7ca7000))





## [0.1.7](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.6...@bothrs/translations@0.1.7) (2021-11-09)

**Note:** Version bump only for package @bothrs/translations





## [0.1.6](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.5...@bothrs/translations@0.1.6) (2021-11-09)


### Bug Fixes

* depency and peer depency mixup ([9f58fd5](https://github.com/bothrs/open-source/commit/9f58fd5d05f3f26bbde329b6d04bb07e5dc3e8f9))





## [0.1.5](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.4...@bothrs/translations@0.1.5) (2021-11-09)

**Note:** Version bump only for package @bothrs/translations





## [0.1.4](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.3...@bothrs/translations@0.1.4) (2021-11-09)


### Bug Fixes

* added linting scripts to packages ([cde1a99](https://github.com/bothrs/open-source/commit/cde1a993cf288d42541e8750dc247199cae5c493))
* depencies to peerdependencies ([1961bff](https://github.com/bothrs/open-source/commit/1961bff76f14a202542cb8303cd1f7b740e65065))
* **ReactNativeLayout:** Nest left, right, top, ... in amount to avoid conflicts with RN props. ([62f1090](https://github.com/bothrs/open-source/commit/62f1090f60c8d7bb121a68bce40b48f1dfd03098))
* simplify translations, remove mapping ([abae665](https://github.com/bothrs/open-source/commit/abae665643616776757670d1e0ae0a2e4ce79cc8))





## [0.1.3](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.2...@bothrs/translations@0.1.3) (2021-10-19)


### Bug Fixes

* **@bothrs/math:** indentation + readme ([acdacee](https://github.com/bothrs/open-source/commit/acdacee9e340d831ec5952c464d97c74407e1dde))





## [0.1.2](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.1...@bothrs/translations@0.1.2) (2021-10-07)


### Bug Fixes

* add react as a peerdepency ([fb27048](https://github.com/bothrs/open-source/commit/fb270486e89de25814a20603296cc06ef27f8238))
* add react as peerdepency ([50aaa12](https://github.com/bothrs/open-source/commit/50aaa122d331aac370e658fab98e91deedd90ba4))
* Revert "fix: add react as a peerdepency" ([d321657](https://github.com/bothrs/open-source/commit/d32165744ddb68775f295ca717dd7a04849778cf))





## [0.1.1](https://github.com/bothrs/open-source/compare/@bothrs/translations@0.1.0...@bothrs/translations@0.1.1) (2021-10-05)


### Bug Fixes

* update readme - fix image of airtable example ([3b96343](https://github.com/bothrs/open-source/commit/3b96343094d6921d3008862cdb0925993ab7185c))





# 0.1.0 (2021-10-04)


### Bug Fixes

* actually skip ts check in node modules ([3f1d910](https://github.com/bothrs/open-source/commit/3f1d91093f7d0b4d5ab31f591608a3ffa260e47f))
* dependency management ([29c8f17](https://github.com/bothrs/open-source/commit/29c8f178e26e574e96a297d6e351cadf62497f22))
* ignore ts errors in external modules ([c558709](https://github.com/bothrs/open-source/commit/c558709115dd43f6a4ba43c1c7aa4507fa3f96a6))
* parameters in hook istead of init function ([dac2fcc](https://github.com/bothrs/open-source/commit/dac2fcc3eda277abd1f9ab9528e1ef8d4f1d545f))
* remove peer depencies ([0fa4d3f](https://github.com/bothrs/open-source/commit/0fa4d3f4514e0d2b23a03d1324e8e3dd04aee4e1))
* typo's in README ([42ddacf](https://github.com/bothrs/open-source/commit/42ddacfa2f83ca533bead7fe723f03515770cedd))
* version numbers of depencies ([74050fe](https://github.com/bothrs/open-source/commit/74050fe35e8d9c400376177871e746f29cf407e7))
* version of i18next-multiload-backend-adapter ([fa9eb77](https://github.com/bothrs/open-source/commit/fa9eb7711d3bcc390fec42a86225e6be4095d6af))


### Features

* dist folder ([bbe2158](https://github.com/bothrs/open-source/commit/bbe2158d177ac498cbd3ba722078284fc2ca672b))
* fallback language and jsdoc ([181a867](https://github.com/bothrs/open-source/commit/181a867d0094d98e339c150db561bed84467e017))
* readme ([d76845f](https://github.com/bothrs/open-source/commit/d76845fb934dde05fa1ca41b3f40fe4fb94f2345))
* translations setup ([6eb072c](https://github.com/bothrs/open-source/commit/6eb072ce929b23c40f2e9a4c86c2970082a44317))
