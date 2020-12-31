# Coronavirus (COVID-19) in the UK

![Build test for pull and push requests](https://github.com/PublicHealthEngland/coronavirus-dashboard/workflows/Build/badge.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/publichealthengland/coronavirus-dashboard)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/publichealthengland/coronavirus-dashboard/v3-development)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/publichealthengland/coronavirus-dashboard)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/publichealthengland/coronavirus-dashboard.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/publichealthengland/coronavirus-dashboard/context:javascript)

This is the frontend source code for the [Coronavirus Dashboard](https://coronavirus.data.gov.uk) service.

## Other services

### The API service

The API supplies the latest data for the COVID-19 outbreak in the United Kingdom. 

The endpoint for the data provided using this SDK is:

    https://api.coronavirus.data.gov.uk/v1/data

Documentations for the API, including the latest metrics, are available on 
the [Developers Guide](https://coronavirus.data.gov.uk/developers-guide) page.

We have also developed software development kits (dedicated libraries) in several programming 
languages to facilitate access to the API:
 
- **Python** library is available on [GitHub®](https://github.com/publichealthengland/coronavirus-dashboard-api-python-sdk) and is published on [PyPI](https://pypi.org/project/uk-covid19/).   
- **JavaScript** library is available on [GitHub®](https://github.com/publichealthengland/coronavirus-dashboard-api-javascript-sdk) and is published on [GitHub® Packages](https://github.com/publichealthengland/coronavirus-dashboard-api-javascript-sdk/packages/343170) and [NPM](https://www.npmjs.com/package/@publichealthengland/uk-covid19).
- **R** library is available on [GitHub®](https://github.com/publichealthengland/coronavirus-dashboard-api-r-sdk) and has been submitted to [CRAN](https://cran.r-project.org) for publication.
- **.Net** library is available of [GitHub®](https://github.com/publichealthengland/coronavirus-dashboard-api-net-sdk) and is published on [NuGet](https://www.nuget.org/packages/UKCovid19/).
- **Elixir** library is available on [GitHub®](https://github.com/publichealthengland/coronavirus-dashboard-api-elixir-sdk).


### Other repositories

Different parts of the Coronavirus dashboard service are maintained in their respective 
repositories, itemised as follows:
 
- [API v.1](https://github.com/publichealthengland/coronavirus-dashboard-api-v1) - Main API service for the data, lookup tables, CMS, and metadata.
- [API v.2](https://github.com/publichealthengland/coronavirus-dashboard-api-v2) - Batch downloads service
- [Frontend server](https://github.com/publichealthengland/coronavirus-dashboard-frontend-server) - Home and postcode pages
- [Layout CMS](https://github.com/publichealthengland/coronavirus-dashboard-layouts) - Definition of contents
- [Metadata](https://github.com/publichealthengland/coronavirus-dashboard-metadata) - Description of metrics and textual contents
- [ETL service](https://github.com/publichealthengland/coronavirus-dashboard-pipeline-etl) - Post-pipeline data processing and deployment
- [Terraform](https://github.com/publichealthengland/coronavirus-dashboard-terraform) - Infrastructure as Code [DEPRECATED]


## Development and contribution

We welcome contributions by everyone. Please read 
the [contributions guide](https://github.com/PublicHealthEngland/coronavirus-dashboard/blob/master/CONTRIBUTING.md) for 
additional information.

### How can I help?
We have a [public project management board](https://github.com/orgs/PublicHealthEngland/projects/1) that 
shows outstanding issues to which everyone can contribute. Pick a ticket, assign it to 
yourself and move it to the **Doing** column, and you will be all set to start. There is 
also the [outstanding issues](https://github.com/PublicHealthEngland/coronavirus-dashboard/issues) from 
which you can choose, but let us know that you are working on it so that multiple people 
don't end. up doing the same task.

No contribution is too small. We welcome help from everyone. Get in touch if you need 
additional information. We are here to help. 

## Cloning the code for re-deployment

### If your service isn’t on GOV.UK
You are welcome to use the GOV.UK patterns and frontend code even if your service isn’t 
considered part of GOV.UK. Although you will sometimes need to use different patterns, 
for example if you are building something like an admin interface.

While you can use the patterns, your site or service must not:

- identify itself as being part of GOV.UK
- use the crown or GOV.UK logotype in the header
- use the GDS Transport typeface
- suggest that it’s an official UK government website if it is not

These things are there to provide a consistent identity and navigation between GOV.UK and 
the sites and transactional services that hang off it. If your service isn’t on GOV.UK, 
there’s no need to maintain that identity - in fact, you might confuse or mislead people 
if you do.

You should also use the brand logo and font of your organisation.

Please consult the [GOV.UK Service Manual](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk#if-your-service-isnt-on-govuk) for 
additional information.

### If you are re-deploying the website as a service

Please only clone our `master` branch for redeployment. All other contents, data, and 
branches that are either outside of the `master` branch or not otherwise used as a 
part of it - i.e. the associating assets - are copyrighted materials and therefore 
excluded from the MIT license until they receieve the necessary approvals to be merged.

Please note that other branches may contain experimental development contents and 
prototypes. We routinely create such materials so that they can be discussed, improved, 
and be put forward for approval purposes. 

You are welcome to use the `development` branch as describeed in 
the [Contributors' Guide](https://github.com/PublicHealthEngland/coronavirus-dashboard/blob/master/CONTRIBUTING.md) to 
help us improve the service and make a contribution.

## Credits
This service is developed and maintained by [Public Health England](https://www.gov.uk/government/organisations/public-health-england).
