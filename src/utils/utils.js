/* used to filter players by name in root/players/ 
** e.g. players.filter(player => playersPageFilterByName(player, do_query)) */
export function playersPageFilterByName(player, do_query) {
  return (
    `${player.first_name}${player.second_name}`
      .toLowerCase()
      .replace(" ", "")
      .startsWith(do_query) ||
    player["first_name"].toLowerCase().startsWith(do_query) ||
    player["second_name"].toLowerCase().startsWith(do_query)
  );
}
