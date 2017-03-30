<?php

class GameController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->View->render('Game/index');
    }

    public function gameOver()
    {
        $this->View->render('Game/GameOver');
    }
}