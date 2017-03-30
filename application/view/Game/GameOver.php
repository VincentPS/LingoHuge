<div class="container">
    <h1>Game Over!</h1>
    <div class="box">
        <!-- echo out the system feedback (error and success messages) -->
        <?php $this->renderFeedbackMessages(); ?>
        <h3>Wilt u het nog eens proberen?</h3>
        <button id="startGame" onclick="buttonGameStart()" type="submit">Start Game</button>
    </div>
</div>
