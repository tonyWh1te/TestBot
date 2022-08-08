const commands = `
/start - Перезапустить бота
/help - Посмотреть список стран
`;

const error_message = `Введена неверная страна. Посмотрите /help`;

const countries_list = `
afghanistan, albania, algeria, andorra, angola, anguilla, antigua-and-barbuda, argentina, armenia, aruba, australia, austria, azerbaijan

bahamas, bahrain, bangladesh, barbados, belarus, belgium, belize, benin, bermuda, bhutan, bolivia, bosnia-and-herzegovina, botswana, brazil, 
british-virgin-islands, brunei-darussalam, bulgaria, burkina-faso, burundi

cabo-verde, cambodia, cameroon, canada, caribbean-netherlands, cayman-islands, central-african-republic, chad, channel-islands, chile, china, china-hong-kong-sar, china-macao-sar, colombia, congo, costa-rica, cote-d-ivoire, croatia, cuba, curacao, cyprus, czech-republic

democratic-republic-of-the-congo, denmark, djibouti, dominica, dominican-republic

ecuador, egypt, el-salvador, equatorial-guinea, eritrea, estonia, ethiopia

faeroe-islands, falkland-islands-malvinas, fiji, finland, france, french-guiana, french-polynesia

gabon, gambia, georgia, germany, ghana, gibraltar, greece, greenland, grenada, guadeloupe, guatemala, guinea, guinea-bissau, guyana

haiti, holy-see, honduras, hungary

iceland, india, indonesia, iran, iraq, ireland, isle-of-man, israel, italy

jamaica, japan, jordan

kazakhstan, kenya, kuwait, kyrgyzstan

laos, latvia, lebanon, liberia, libya, liechtenstein, lithuania, luxembourg

macedonia, madagascar, malawi, malaysia, maldives, mali, malta, martinique, mauritania, mauritius, mayotte, mexico, moldova, monaco, mongolia, montenegro, montserrat, morocco, mozambique, myanmar

namibia, nepal, netherlands, new-caledonia, new-zealand, nicaragua, niger, nigeria, norway

oman

pakistan, panama, papua-new-guinea, paraguay, peru, philippines, poland, portugal

qatar

reunion, romania, russia, rwanda

saint-barthelemy, saint-kitts-and-nevis, saint-lucia, saint-martin, saint-vincent-and-the-grenadines, san-marino, saudi-arabia, senegal, serbia, seychelles, sierra-leone, singapore, sint-maarten, slovakia, slovenia, somalia, south-africa, south-korea, spain, sri-lanka, state-of-palestine, sudan, suriname, swaziland, sweden, switzerland, syria

taiwan, tanzania, thailand, timor-leste, togo, trinidad-and-tobago, tunisia, turkey, turks-and-caicos-islands

uganda uk ukraine united-arab-emirates uruguay us uzbekistan

venezuela, viet-nam

zambia, zimbabwe
`;

const text1 = `
1 текст для проверки обработчика и <a href="https://youtube.com/">ссылка</a>
`;

const text2 = `
2 текст для проверки обработчика и <a href="https://youtube.com/">ссылка</a>
`;

const text3 = `
3 текст для проверки обработчика и <a href="https://youtube.com/">ссылка</a>
`;

module.exports.commands = commands;
module.exports.text1 = text1;
module.exports.text2 = text2;
module.exports.text3 = text3;
module.exports.countries_list = countries_list;
module.exports.error_message = error_message;
