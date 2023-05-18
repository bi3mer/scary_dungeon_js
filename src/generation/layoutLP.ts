export const LP = `
%%%%%%%%%%%%%% Problem Definition %%%%%%%%%%%%%%
% #const width=9.
% #const height=5.
% #const gems=1.
#const dist=(width+height)/2.

param("width",width).
param("height",height).

col(1..width).
row(1..height).

start((1,1)).
finish((width,height)).

% define grid of tiles
tile((X,Y)) :- col(X), row(Y).

% define adjacency
adj((X1,Y1),(X2,Y2)) :- tile((X1,Y1)), tile((X2,Y2)), |X1-X2|+|Y1-Y2| == 1.

% define tile types
type(wall).
type(gem).
type(altar).

% tiles have at most one named sprite
0 { sprite(T,P) : type(P) } 1 :- tile(T).

% there is exactly one altar and two gems in the whole level
:- not 1 { sprite(T,altar) } 1.
:- not gems { sprite(T,gem) } gems.

% Note this is an implication rule so it is excluding sets. So the one below
% is excluding solutions where walls don't occur at least 50% of the time.
% style : at least half of the map has wall sprites
:- not (width*height)/2 { sprite(T,wall) }.


%%%%%%%%%%%%%% Reachability %%%%%%%%%%%%%%
% 1 ==> initial
touch(T,1) :- start(T).

% 2 ==> after picking up gem
{ touch(T2,2) : adj(T1, T2) } :- touch(T1,1), sprite(T1, gem).

% 3 ==> after putting gem in altar
{ touch(T2,3) : adj(T1, T2) } :- touch(T1,2), sprite(T1, altar).

% general move with the past state
{ touch(T2,S) : adj(T1, T2) } :- touch(T1,S).

% You can't touch a wall.
:- sprite(T1, wall), touch(T1, S).

% The level must be beatable.
completed :- finish(T), touch(T, 3).
:- not completed.


%%%%%%%%%%%%%% Style %%%%%%%%%%%%%%
% Altars have no surrounding walls for two steps
0 { sprite(T2, wall) : adj(T1,T2) } 0 :- sprite(T1, altar).
0 { sprite(T3, wall) : adj(T1,T2), adj(T2,T3) } 0 :- sprite(T1, altar).

% Distance between altar and key must be reasonably large
|X1-X2|+|Y1-Y2| > minval/2 :- sprite((X1, Y1), altar), sprite((X2, Y2), gem).

% Distance between gems must be reasonably large
|X1-X2|+|Y1-Y2| > minval/2 :- X1 != X2, sprite((X1, Y1), gem), sprite((X2, Y2), gem).
|X1-X2|+|Y1-Y2| > minval/2 :- Y1 != Y2, sprite((X1, Y1), gem), sprite((X2, Y2), gem).

% altars have four adjacent tiles (not up against edge of map)
% :- sprite(T1, altar), not 4 { adj(T1, T2) }.

% Every wall has at least two neighboring walls (no isolated rocks and spurs )
% 2 { sprite(T2, wall) : adj(T1, T2) } :- sprite(T1, wall).

% Gems have at least three surrounding walls (they are stuck in a larger wall )
% 3 { sprite(T2, wall) : adj(T1, T2) } 3 :- sprite(T1, gem).

% All non-wall tiles must be reachable
:- tile(T1), not touch(T1, 1), not sprite(T1, wall).
:- tile(T1), not touch(T1, 2), not sprite(T1, wall).
:- tile(T1), not touch(T1, 3), not sprite(T1, wall).

#show sprite/2.

`;